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
    <AuthSignUp 
      v-if="state.currentTab === Tabs.SIGN_UP"
      @sign-up-completed="state.currentTab = Tabs.SIGN_IN" 
    />
    <AuthForgotPassword
      v-if="state.currentTab === Tabs.FORGOT_PASSWORD"
      @reset-completed="state.currentTab = Tabs.SIGN_IN"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import AuthSignIn from './AuthSignIn'
import AuthSignUp from './AuthSignUp'
import AuthForgotPassword from './AuthForgotPassword'
const route = useRoute()

const Tabs = Object.freeze({
  SIGN_UP: 'signUp',
  SIGN_IN: 'signIn',
  FORGOT_PASSWORD: 'forgotPassword',
})

function currentTab() {
  switch (route.query.tab) {
    case Tabs.SIGN_UP:
      return Tabs.SIGN_UP;
    case Tabs.SIGN_IN:
      return Tabs.SIGN_IN;
    case Tabs.FORGOT_PASSWORD:
      return Tabs.FORGOT_PASSWORD;
    default:
      return Tabs.SIGN_UP;
  }
}

const state = reactive({
  currentTab: currentTab()
})
</script>
