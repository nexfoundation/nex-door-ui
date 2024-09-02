<template>
  <div
    ref="formContainer"
    class="card w-96 mx-auto shadow-xl"
  >
    <div class="card-body">
      <h1 class="card-title">
        註冊
      </h1>
      <AuthSignUpFormCredential
        :error-message="state.errorMessage"
        @submit="signUp"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'
import { useI18n } from '../mixin/i18n'
import AuthSignUpFormCredential from './AuthSignUpFormCredential'
import { auth } from '../firebase-exports'
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth'

const emit = defineEmits(['sign-up-completed'])


const { geti18nAuthenticationErrorMessage } = useI18n()

const $loading = useLoading()

const formContainer = ref(null)
const state = reactive({
  username: '',
  email: '',
  errorMessage: ''
})


async function signUp(form) {
  state.errorMessage = ''
  const loader = $loading.show({
    container: formContainer.value
  })

  try {
    state.username = form.username
    state.email = form.attributes.email
    const userCredential = await createUserWithEmailAndPassword(auth, form.attributes.email, form.password)
    emit('sign-up-completed')
    await sendEmailVerification(userCredential.user)
    await signOut(auth)
  } catch (err) {
    state.errorMessage = geti18nAuthenticationErrorMessage(err.message)
  } finally {
    loader.hide()
  }
}
</script>
