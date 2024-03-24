<template>
  <div class="flex flex-col min-h-screen font-body">
    <div class="flex-grow">
      <AppNavbar />
      <router-view />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import { themeChange } from 'theme-change'

import AppNavbar from './AppNavbar'
import AppFooter from './AppFooter'

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter,
  },
  async beforeCreate() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.$store.dispatch('setIsAuthenticated', true)
      this.$store.dispatch('setUser', user)
    } catch (err) {
      // guest user
    }
  },
  mounted() {
    themeChange(false)
  },
}
</script>
