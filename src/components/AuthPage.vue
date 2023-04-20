<template>
  <div class="container my-20">
    <div class="tabs tabs-boxed w-96 mx-auto mt-8 justify-center bg-transparent">
      <div
        class="tab"
        :class="{ 'tab-active': state.currentTab === Tabs.SIGN_IN }"
        @click="state.currentTab = Tabs.SIGN_IN"
      >
        登入
      </div>
      <div
        class="tab"
        :class="{ 'tab-active': state.currentTab === Tabs.SIGN_UP }"
        @click="state.currentTab = Tabs.SIGN_UP"
      >
        註冊
      </div>
    </div>
    <AuthSignIn
      v-if="state.currentTab === Tabs.SIGN_IN"
      @forgot-password="state.currentTab = Tabs.FORGOT_PASSWORD"
    />
    <AuthSignUp v-if="state.currentTab === Tabs.SIGN_UP" />
    <AuthForgotPassword
      v-if="state.currentTab === Tabs.FORGOT_PASSWORD"
      @reset-completed="state.currentTab = Tabs.SIGN_IN"
    />
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
</script>
