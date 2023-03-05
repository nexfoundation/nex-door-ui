<template>
  <div>
    <div class="navbar">
      <div class="flex-1">
        <router-link to="/" class="flex">
          <img class="w-10" src="../assets/headerimg.png" /> <span class="self-center">NEX Door</span>
        </router-link>
      </div>
      <div class="flex-none">
        <div v-if="this.$route.path !== '/auth'">
          <ul class="menu menu-horizontal px-1">
            <li><router-link to="/">Home</router-link></li>
            <li v-if="isAuthenticated"><p v-on:click="signOut">Sign Out</p></li>
            <li v-if="!isAuthenticated"><router-link to="/auth">Sign In</router-link></li>
            <li v-if="isAuthenticated"><router-link to="/profile">Profile</router-link></li>
            <li><router-link to="/protected">Protected Route</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <footer class="flex flex-row p-4 bg-primary">
        <div class="basis-2/3 pr-2">
          <p class="w-full footer-text">NEX Work 為非營利服務平台，由美國 NEX Foundation 建置，2020 年正式營運。<br>NEX Foundation 為美國註冊商標，屬 NEX Foundation 所有。 其餘各商標均為個別原始公司所有，NEX Foundation 與各該公司並無代理權限或合作關係。<br><br>Copyright © 2020</p>
        </div>
        <div class="basis-1/3 pl-2">
          <a target="_blank" href="https://nexf.org"><img src="../assets/nexf_logo.png" alt="NEX Foundation"></a>
        </div>
    </footer>
  </div>
</template>

<script>

export default {
  async beforeCreate() {
    try {
      const user = await this.$Amplify.Auth.currentAuthenticatedUser()
      this.$store.dispatch('setIsAuthenticated', true)
      this.$store.dispatch('setUser', user)
      this.$router.push('profile')
    } catch (err) {
      console.log('error: ', err)
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    },
  },
  methods: {
    async signOut() {
      try {
        await this.$Amplify.Auth.signOut()
        this.$store.dispatch('setIsAuthenticated', false)
        this.$store.dispatch('setUser', {})
        this.$router.push('/')
      } catch (err) {
        console.log('error signing out.')
      }
    }
  },
  name: 'app',
}
</script>
