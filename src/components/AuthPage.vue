<template>
  <div class="container my-20">
    <AuthSignIn v-if="state.currentTab === Tabs.SIGN_IN" />
    <AuthSignUp v-if="state.currentTab === Tabs.SIGN_UP" />
    <AuthForgotPassword
      v-if="state.currentTab === Tabs.FORGOT_PASSWORD"
      @reset-completed="state.currentTab = Tabs.SIGN_IN"
    />
    <div class="tabs tabs-boxed w-96 mx-auto mt-8">
      <div
        v-for="tab in Tabs"
        :key="tab"
        class="tab"
        :class="{ 'tab-active': state.currentTab === tab }"
        @click="state.currentTab = tab"
      >
        {{ getTabDisplayName(tab) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import AuthSignIn from './AuthSignIn'
import AuthSignUp from './AuthSignUp'
import AuthForgotPassword from './AuthForgotPassword'

const Tabs = Object.freeze({
  SIGN_UP: 'signUp',
  SIGN_IN: 'signIn',
  FORGOT_PASSWORD: 'forgotPassword',
})

const state = reactive({
  currentTab: Tabs.SIGN_UP,
})

function getTabDisplayName(tab) {
  switch(tab) {
    case Tabs.SIGN_UP:
      return 'Sign Up'
    case Tabs.SIGN_IN:
      return 'Sign In'
    case Tabs.FORGOT_PASSWORD:
      return 'Forgot Password'
    default:
      return ''
  }
}
</script>
