<template>
  <div class="hero" v-bind:class="[theme]">
  <!-- <div class="hero" > -->
  <!-- <div class="hero" :data-theme="light" :prefers-color-scheme="'light'"> -->
    <nav class="container-fluid">
      <ul>
        <router-link to="/">
          <li>

            <img class='header-img' src="../assets/headerimg.png" />
          </li>
          <li>
            NEX Door

          </li>

        </router-link>
      </ul>
      <ul class="header-menu" v-if="this.$route.path !== '/auth'">
        <li>
          <router-link to="/" class='link'>Home</router-link>
        </li>
        <li v-if="isAuthenticated">
          <p class='link' v-on:click="signOut">Sign Out</p>
        </li>
        <li v-if="!isAuthenticated">
          <router-link class='link' to="/auth" role="button">Sign In</router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link class='link' to="/profile">Profile</router-link>
        </li>
        <li>
          <router-link class='link' to="/protected">Protected Route</router-link>
        </li>
      </ul>
    </nav>
    <main class="container">

      <router-view></router-view>
    </main>
    <footer class="container-fluid" id="nex-footer">
      <div class="grid">
        <!-- <div class="col-md-8"> -->
          
        <article>NEX Work 為非營利服務平台，由美國 NEX Foundation 建置，2020 年正式營運。<br>NEX Foundation 為美國註冊商標，屬 NEX
          Foundation 所有。 其餘各商標均為個別原始公司所有，NEX Foundation 與各該公司並無代理權限或合作關係。<br><br>Copyright © 2020</article>
        <!-- </div> -->
        <!-- <div class="col-md-4"> -->
        <figure>

          <a target="_blank" href="https://nexf.org"><img src="../assets/nexf_logo.png" alt="NEX Foundation"></a>
        </figure>
        <!-- </div> -->
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
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },

    colorScheme() {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
    }
  },
  data() {
  return {
    theme: this.colorScheme
  }
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
[data-theme="light"],
/* :root:not([data-theme="dark"]) {
  --primary: #307fc4;
  --primary-hover: #c2185b;
  --primary-focus: rgba(216, 27, 96, 0.125);
  --primary-inverse: #FFF;
} */
.light {
  /* light theme styles */
}
.dark {
  /* dark theme styles */
}
.header-img {
  height: 42px;
}
</style>
