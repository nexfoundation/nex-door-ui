<template>
  <div
    ref="formContainer"
    class="card w-96 mx-auto shadow-xl"
  >
    <div class="card-body">
      <h1 class="card-title">
        註冊 Sign Up
      </h1>
      <AuthSignUpFormCredential
        v-if="state.phase === AuthSignUpPhases.CREDENTIAL"
        :error-message="state.errorMessage"
        @submit="signUp"
      />
      <AuthSignUpFormConfirmation
        v-if="state.phase === AuthSignUpPhases.CONFIRMATION"
        :confirmation-code-cooldown-second="state.confirmationCodeCooldownSecond"
        :error-message="state.errorMessage"
        @submit="confirmSignUp"
        @resend-confirmation-code="resendConfirmationCode"
      />
    </div>
  </div>
</template>

<script setup>
import { Auth } from 'aws-amplify';
import { reactive, ref } from 'vue';
import { useLoading } from 'vue-loading-overlay';
import { useI18n } from '../mixin/i18n'
import AuthSignUpFormCredential from './AuthSignUpFormCredential'
import AuthSignUpFormConfirmation from './AuthSignUpFormConfirmation'


const { geti18nAuthenticationErrorMessage } = useI18n()

const $loading = useLoading();

const AuthSignUpPhases = Object.freeze({
  CREDENTIAL: 'credntial',
  CONFIRMATION: 'confirmation',
})

function confirmationCodeCooldownCountdown() {
  if (state.confirmationCodeCooldownSecond > 0) {
    setTimeout(() => {
      state.confirmationCodeCooldownSecond -= 1
      confirmationCodeCooldownCountdown()
    }, 1000)
  }
}

const formContainer = ref(null)
const state = reactive({
  phase: AuthSignUpPhases.CREDENTIAL,
  username: '',
  errorMessage: '',
  confirmationCodeCooldownSecond: 30
})


async function signUp(form) {
  const loader = $loading.show({
    container: formContainer.value
  })

  state.errorMessage = ''
  try {
    state.username = form.username
    await Auth.signUp({
      ...form,
      autoSignIn: {
        enabled: true,
      },
    })

    state.phase = AuthSignUpPhases.CONFIRMATION
    confirmationCodeCooldownCountdown()

  } catch (err) {
    console.error('error signing up...', err)
    state.errorMessage = geti18nAuthenticationErrorMessage(err.message)

  } finally {
    loader.hide()
  }
}

async function confirmSignUp(form) {
  const loader = $loading.show({
    container: formContainer.value
  })

  try {
    await Auth.confirmSignUp(state.username, form.authCode)

  } catch (err) {
    console.error('error signing up...', err)
    state.errorMessage = err

  } finally {
    loader.hide()
  }
}

async function resendConfirmationCode() {
  // Ignore the request if it is still in the resend confirmation code cooldown period
  if (state.confirmationCodeCooldownSecond > 0) {
    return
  }

  this.confirmationCodeCooldownSecond = 90
  confirmationCodeCooldownCountdown()
  try {
    await Auth.resendSignUp(state.username);
  } catch (err) {
    console.error('error resending code: ', err);
  }
}
</script>
