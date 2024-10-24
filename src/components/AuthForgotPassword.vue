<template>
  <div
    ref="formContainer"
    class="card w-96 mx-auto shadow-xl"
  >
    <div class="card-body">
      <h1 class="card-title">
        重設密碼
      </h1>
      <template v-if="state.formState === AuthForgotPasswordState.INITIAL">
        <Form
          v-slot="{ meta, isSubmitting }"
          @submit="onSubmitForgotPassword"
        >
          <div
            v-if="state.errorMessage"
            class="alert alert-error"
            role="alert"
          >
            {{ state.errorMessage }}
          </div>
          <BaseInput
            name="username"
            label="用戶名稱"
            autocomplete="username"
            rules="required"
          />
          <div class="card-actions flex-col items-center mt-2">
            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="!meta.valid || isSubmitting"
            >
              發送驗證碼
            </button>
          </div>
        </Form>
      </template>
      <template v-if="state.formState === AuthForgotPasswordState.CONFIRMATION">
        <Form
          v-slot="{ meta, isSubmitting }"
          @submit="onSubmitForgotPasswordConfirm"
        >
          <div
            v-if="state.errorMessage"
            class="alert alert-error"
            role="alert"
          >
            {{ state.errorMessage }}
          </div>
          <BaseInput
            name="authCode"
            autocomplete="one-time-code"
            label="驗證碼"
            rules="required"
          />
          <BaseInput
            name="password"
            type="password"
            autocomplete="new-password"
            label="新密碼"
            rules="required|min:8"
          />
          <div class="card-actions flex-col items-center mt-2">
            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="!meta.valid || isSubmitting"
            >
              重設密碼
            </button>
          </div>
        </Form>
      </template>
    </div>
  </div>
</template>

<script setup>
import { Auth } from 'aws-amplify'
import { reactive, ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { Form, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useI18n } from '../mixin/i18n'
import BaseInput from './base/BaseInput'

defineRule('required', required)


const { geti18nAuthenticationErrorMessage } = useI18n()

const $loading = useLoading()

const AuthForgotPasswordState = Object.freeze({
  INITIAL: 'resetPassword',
  CONFIRMATION: 'resetPasswordConfirm',
})

const formContainer = ref(null)
const state = reactive({
  username: '',
  formState: AuthForgotPasswordState.INITIAL,
})

async function onSubmitForgotPassword(values) {
  state.errorMessage = ''
  const loader = $loading.show({
    container: formContainer.value
  })

  try {
    await Auth.forgotPassword(values.username)

    state.username = values.username
    state.formState = AuthForgotPasswordState.CONFIRMATION

  } catch (err) {
    state.errorMessage = geti18nAuthenticationErrorMessage(err.message)

  } finally {
    loader.hide()
  }
}

const emit = defineEmits(['resetCompleted'])
async function onSubmitForgotPasswordConfirm(values) {
  state.errorMessage = ''
  const loader = $loading.show({
    container: formContainer.value
  })

  try {
    await Auth.forgotPasswordSubmit(state.username, values.authCode, values.password)
    emit('resetCompleted')
  } catch (err) {
    state.errorMessage = geti18nAuthenticationErrorMessage(err.message)

  } finally {
    loader.hide()
  }
}

</script>
