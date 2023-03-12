import { createApp } from 'vue'
import * as VueRouter from 'vue-router'

// amplify configuration
import { Amplify, Auth, Hub } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

// loading
import 'vue-loading-overlay/dist/css/index.css';

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


Hub.listen('auth', ({ payload }) => {
  console.debug('Hub', 'auth triggered')
  const { event } = payload;
  if (event === 'autoSignIn') {
      const user = payload.data;
      store.dispatch('setIsAuthenticated', true)
      store.dispatch('setUser', user)
      router.push('/profile')
  } else if (event === 'autoSignIn_failure') {
      // redirect to sign in page
  }
})

// implement protected routes for only signed in users
router.beforeResolve((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        if (data && data.signInUserSession) {
          next()
        }
      })
      .catch(() => {
        console.log(
          'You are trying to access a protected route. Please sign in.'
        )
        next({
          path: '/',
          query: {
            redirect: to.fullPath,
          },
        })
      })
  }
  next();
});

app.use(store)
app.use(router)
app.mount('#app')
