<template>
  <ul v-bind="menuAttrs">
    <li v-if="isAuthenticated">
      <p @click="signOut">
        登出
      </p>
    </li>
    <li v-if="!isAuthenticated">
      <router-link to="/auth">
        登入註冊
      </router-link>
    </li>
    <li v-if="isAuthenticated">
      <router-link to="/profile">
        個人資料
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { Auth } from 'aws-amplify'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()

const props = defineProps({
  isMobile: Boolean,
})

const menuAttrs = computed(() => {
  return props.isMobile
    ? { tabindex: 0, class: 'menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52' }
    : { class: 'menu menu-horizontal px-1 gap-2' }
})

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