import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import './style.css'

// amplify configuration
import { Amplify, Auth, Hub } from 'aws-amplify'
import awsExports from './aws-exports'
Amplify.configure(awsExports)
Amplify.configure({
    API: {
        endpoints: [
        {
            name: 'ServiceEndpoint',
            endpoint: process.env.VUE_APP_SERVICE_ENDPOINT,
            custom_header: async () => {
                let currentUserSession;
                try {
                    currentUserSession = await Auth.currentSession()
                } catch (e) {
                    // Remove authorization header when user is not login or no user data
                    console.log(e)
                    return {}
                }

                // Alternatively, with Cognito User Pools use this:
                return { Authorization: currentUserSession.idToken.jwtToken }
            }
        },
        ]
    }
})

// loading
import 'vue-loading-overlay/dist/css/index.css'

// multiselect
import 'vue-multiselect/dist/vue3-multiselect.css'

// Vue components
import App from './components/App.vue'
import AuthPage from './components/AuthPage.vue'
import HomePage from './components/HomePage.vue'
import ProfilePage from './components/ProfilePage.vue'

// Vuex store
import store from './store'

// route configuration
const routes = [
  { path: '/', component: HomePage },
  { path: '/auth', component: AuthPage },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
]

// router definition
const router = VueRouter.createRouter({
  routes,
  mode: 'history',
  history: VueRouter.createWebHistory(),
})

const app = createApp(App)
app.provide('appServiceEndpoint', process.env.VUE_APP_SERVICE_ENDPOINT)
app.provide('appUserPictureServiceEndpoint', process.env.VUE_APP_USER_PICTURE_SERVICE_ENDPOINT)


// Hub is also detecting Social IDP Login (Google)
Hub.listen('auth', ({ payload }) => {
  const { event } = payload
  if (event === 'autoSignIn' || event === 'signIn') {
      const user = payload.data
      store.dispatch('setIsAuthenticated', true)
      store.dispatch('setUser', user)
      router.push('/profile')
  } else if (event === 'autoSignIn_failure') {
      // redirect to sign in page
  }
})

// implement protected routes for only signed in users
router.beforeResolve(async (to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const data = await Auth.currentAuthenticatedUser()
      if (data && data.signInUserSession) {
        next()
      }
    } catch (err) {
      next({
        path: '/auth',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  }
  else next()
})

app.use(store)
app.use(router)
app.mount('#app')
