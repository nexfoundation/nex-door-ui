<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <div class="navbar">
        <div class="navbar-start">
          <div class="dropdown">
            <label
              tabindex="0"
              class="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              /></svg>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <router-link to="/">
                  Home
                </router-link>
              </li>
              <li v-if="isAuthenticated">
                <p @click="signOut">
                  Sign Out
                </p>
              </li>
              <li v-if="!isAuthenticated">
                <router-link to="/auth">
                  Sign In
                </router-link>
              </li>
              <li v-if="isAuthenticated">
                <router-link to="/profile">
                  Profile
                </router-link>
              </li>
            </ul>
          </div>
          <router-link
            to="/"
            class="flex"
          >
            <img
              class="w-10"
              src="../assets/headerimg.png"
            > <span class="self-center">NEX Door</span>
          </router-link>
        </div>
        <div class="navbar-end hidden lg:flex">
          <div v-if="$route.path !== '/auth'">
            <ul class="menu menu-horizontal px-1">
              <li>
                <router-link to="/">
                  Home
                </router-link>
              </li>
              <li v-if="isAuthenticated">
                <p @click="signOut">
                  Sign Out
                </p>
              </li>
              <li v-if="!isAuthenticated">
                <router-link to="/auth">
                  Sign In
                </router-link>
              </li>
              <li v-if="isAuthenticated">
                <router-link to="/profile">
                  Profile
                </router-link>
              </li>
            </ul>
          </div>
          <input
            type="checkbox"
            class="toggle"
            data-toggle-theme="dark,light"
            data-act-class="ACTIVECLASS"
          >
        </div>
      </div>
      <router-view />
    </div>

    <footer class="footer bottom-0 w-full p-4 bg-primary">
      <p class="w-full footer-text text-primary-content">
        NEX Work 為非營利服務平台，由美國 NEX Foundation 建置，2020 年正式營運。<br>
        NEX Foundation 為美國註冊商標，屬 NEX Foundation 所有。 其餘各商標均為個別原始公司所有，NEX Foundation 與各該公司並無代理權限或合作關係。<br><br>
        Copyright © 2020
      </p>
      <div>
        <a
          target="_blank"
          href="https://nexf.org"
        ><img
          src="../assets/nexf_logo.png"
          alt="NEX Foundation"
        ></a>
      </div>
    </footer>
  </div>
</template>

<script>
import { themeChange } from 'theme-change';

export default {
  name: 'App',
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    },
  },
  async beforeCreate() {
    try {
      const user = await this.$Amplify.Auth.currentAuthenticatedUser()
      this.$store.dispatch('setIsAuthenticated', true)
      this.$store.dispatch('setUser', user)
      // this.$router.push('profile')
    } catch (err) {
      console.log('guest user')
    }
  },
  mounted() {
    themeChange(false);
  },
  methods: {
    async signOut() {
      try {
        await this.$Amplify.Auth.signOut()
        this.$store.dispatch('setIsAuthenticated', false)
        this.$store.dispatch('setUser', {})
        this.$router.push('/')
      } catch (err) {
        console.error('error signing out:', err)
      }
    }
  },
}
</script>