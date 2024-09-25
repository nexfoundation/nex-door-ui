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
            id="email"
            name="email"
            label="電子信箱"
            autocomplete="email"
            rules="required|email"
          />
          <div class="card-actions flex-col items-center mt-2">
            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="!meta.valid || isSubmitting"
            >
              送出
            </button>
          </div>
        </Form>
      </template>
    </div>
  </div>
</template>

<script setup>
import { auth } from '../firebase-exports'
import { sendPasswordResetEmail } from 'firebase/auth'
import { reactive, ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { Form, defineRule } from 'vee-validate'
import { email, required } from '@vee-validate/rules'
import { useI18n } from '../mixin/i18n'
import BaseInput from './base/BaseInput.vue'

defineRule('required', required)
defineRule('email', email)


const { geti18nAuthenticationErrorMessage } = useI18n()

const $loading = useLoading()

const AuthForgotPasswordState = Object.freeze({
  INITIAL: 'resetPassword',
  CONFIRMATION: 'resetPasswordConfirm',
})

const formContainer = ref(null)
const state = reactive({
  email: '',
  formState: AuthForgotPasswordState.INITIAL,
})

const emit = defineEmits(['reset-completed'])
async function onSubmitForgotPassword(values) {
  state.errorMessage = ''
  const loader = $loading.show({
    container: formContainer.value
  })

  try {
    await sendPasswordResetEmail(auth, values.email)
    //TODO: show email sent message like a toast
    setTimeout(() => {
      emit('reset-completed')
      state.email = values.email
      state.formState = AuthForgotPasswordState.CONFIRMATION
    }, 3000)
  } catch (err) {
    state.errorMessage = geti18nAuthenticationErrorMessage(err.message)

  } finally {
    loader.hide()
  }
}

</script>
