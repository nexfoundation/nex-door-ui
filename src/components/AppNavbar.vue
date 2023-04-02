<template>
  <div class="navbar bg-white px-4 py-2 md:px-6 md:py-3 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
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
          src="../assets/nex_logo_notext.svg"
        > <span class="pl-2 self-center text-xl font-bold">NEX Door</span>
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
</template>

<script setup>
import { Auth } from 'aws-amplify'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => {
  return store.state.isAuthenticated
})

async function signOut() {
  try {
    await Auth.signOut()
    store.dispatch('setIsAuthenticated', false)
    store.dispatch('setUser', {})
    router.push('/')
  } catch (err) {
    console.error('error signing out:', err)
  }
}
</script>