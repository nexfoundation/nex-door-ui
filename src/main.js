import { createApp } from 'vue'
import * as VueRouter from 'vue-router'

// amplify configuration
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

// Vue components
import App from './components/App.vue'
import Auth from './components/Auth.vue'
import Home from './components/Home.vue'
import Profile from './components/Profile.vue'

// Vuex store
import store from './store'

// route configuration
const routes = [
  { path: '/', component: Home },
  { path: '/auth', component: Auth },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
]

// router definition
const router = VueRouter.createRouter({
  routes,
  mode: 'history',
  history: VueRouter.createWebHistory(),
})

let app = createApp(App)

// implement protected routes for only signed in users
router.beforeResolve((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    app.config.globalProperties.$Amplify.Auth.currentAuthenticatedUser()
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

// Vue.config.productionTip = false;
app.use(VueRouter)
app.use(AmplifyPlugin, AmplifyModules)
app.use(store)
app.use(router)
app.mount('#app')
