import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import './style.css'

//Firebase configuration
import { auth } from './firebase-exports'
import { onAuthStateChanged } from 'firebase/auth'

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

onAuthStateChanged(auth, (user) => {
  if (user && user.metadata.creationTime !== user.metadata.lastSignInTime) {
    store.dispatch('setIsAuthenticated', true)
    store.dispatch('setUser', user)
  }
})

// implement protected routes for only signed in users
router.beforeResolve(async (to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = auth.currentUser
    if (user) {
      try {
        await user.getIdToken()
        next()
      } catch (err) {
        next({
          path: '/auth',
          query: { redirect: to.fullPath},
        })
      }
    } else {
      next({
        path: '/auth',
        query: { redirect: to.fullPath},
      })
    }
  }
  else next()
})

app.use(store)
app.use(router)
app.mount('#app')
