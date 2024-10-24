<template>
  <div
    ref="formContainer"
    class="card w-96 mx-auto shadow-xl"
  >
    <div class="card-body">
      <h1 class="card-title">
        登入
      </h1>
      <div
        v-if="state.errorMessage"
        class="alert alert-error"
        role="alert"
      >
        {{ state.errorMessage }}
      </div>
      <Form
        v-slot="{ meta, isSubmitting }"
        class="flex flex-col"
        @submit="onSubmit"
      >
        <BaseInput
          id="username"
          name="username"
          label="用戶名稱"
          autocomplete="username"
          rules="required"
        />
        <BaseInput
          id="password"
          name="password"
          label="密碼"
          type="password"
          autocomplete="current-password"
          rules="required"
        />


        <div class="card-actions flex-col items-center mt-4">
          <a
            class="link"
            @click="$emit('forgotPassword')"
          >忘記密碼？</a>
          <button
            type="submit"
            class="text-center content-center bg-gradient-to-r from-[#6FD7FD] to-[#47DE7899]/[0.6] hover:from-[#9FE4FE] hover:to-[#C6F5D5] border-none w-full h-[48px] rounded-[100px] text-black text-[20px] disabled:bg-[#E5E8EE] font-medium"
            :disabled="!meta.valid || isSubmitting"
          >
            登入
          </button>
          <span>或</span>
          <button
            type="button"
            class="btn btn-secondary btn-outline w-full !text-black border-secondary-blue text-[20px] rounded-[100px] font-medium border-[2px] normal-case"
            @click="googleIDPLogin"
          >
            Google 登入
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Auth } from 'aws-amplify'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useLoading } from 'vue-loading-overlay'
import { Form, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useI18n } from '../mixin/i18n.js'
import BaseInput from './base/BaseInput'

const router = useRouter()
const route = useRoute()
const store = useStore()
const $loading = useLoading()
const { geti18nAuthenticationErrorMessage } = useI18n()

defineRule('required', required)

const formContainer = ref(null)
const state = reactive({
  errorMessage: ''
})

async function onSubmit(values) {
  state.errorMessage = ''
  const loader = $loading.show({
    container: formContainer.value
  })
  const { username, password } = values

  try {
    const user = await Auth.signIn(username, password)
    store.dispatch('setIsAuthenticated', true)
    store.dispatch('setUser', user)
    if (route.query.redirect) {
      router.push(route.query.redirect)
    } else {
      router.push('/')
    }

  } catch (err) {
    state.errorMessage = geti18nAuthenticationErrorMessage(err.message)

  } finally {
    loader.hide()
  }
}

async function googleIDPLogin() {
  Auth.federatedSignIn({ provider: 'Google' })
}

defineEmits(['forgotPassword'])
</script>

