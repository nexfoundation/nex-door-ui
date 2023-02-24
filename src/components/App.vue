<template>
  <div>
    <div class='header'>
      <img class='header-img' src="../assets/headerimg.png" />
      <router-link to="/" class='heading'>NEX Door</router-link>
      <div class="header-menu" v-if="this.$route.path !== '/auth'">
        <router-link to="/" class='link'>Home</router-link>
        <p class='link' v-on:click="signOut" v-if="isAuthenticated">Sign Out</p>
        <router-link class='link' to="/auth" v-if="!isAuthenticated">Sign In</router-link>
        <router-link class='link' to="/profile" v-if="isAuthenticated">Profile</router-link>
        <router-link class='link' to="/protected">Protected Route</router-link>
      </div>
    </div>
    <router-view></router-view>
    <footer class="flex flex-row" id="nex-footer">
        <div class="basis-2/3">
          <p class="w-full footer-text">NEX Work 為非營利服務平台，由美國 NEX Foundation 建置，2020 年正式營運。<br>NEX Foundation 為美國註冊商標，屬 NEX Foundation 所有。 其餘各商標均為個別原始公司所有，NEX Foundation 與各該公司並無代理權限或合作關係。<br><br>Copyright © 2020</p>
        </div>
        <div class="basis-1/3">
          <a target="_blank" href="https://nexf.org"><img class="footer-logo" src="../assets/nexf_logo.png" alt="NEX Foundation"></a>
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

<style scoped>
.header-menu {
  flex: 1;
  padding-right: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.link {
  text-align: right;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  margin: 0px 0px 0px 30px;
  color: #202124;
  text-decoration: none;
}
.header {
  display: flex;
  background-color: white;;
  padding: 20px;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15);
  align-items: center;
}
.heading {
  color: #606368;
  text-align: left;
  margin: 4px;
  padding-top: 5px;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
}
.header-img {
  height: 42px;
}
footer#nex-footer {
  background-color: #307fc4;
  margin-top: 3em;
}
footer#nex-footer .footer-text {
  padding: 3em;
  text-align: left;
  color: #fff;
  font-size: 14px;
}
footer#nex-footer img.footer-logo {
  padding: 3em;
  width: 80%;
}
</style>
