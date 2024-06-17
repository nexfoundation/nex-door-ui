<template>
  <div class="flex flex-col font-body w-screen bg-[#F4F6FA] min-h-screen">
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
