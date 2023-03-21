<template>
  <div
    ref="formContainer"
    class="card w-96 mx-auto shadow-xl"
  >
    <div class="card-body">
      <h1 class="card-title">
        登入 Sign In
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
          label="用戶名稱 (Username)"
          placeholder="用戶名稱 (Username)"
          autocomplete="username"
          rules="required"
        />
        <BaseInput
          id="password"
          name="password"
          label="密碼 (Password)"
          placeholder="密碼 (Password)"
          type="password"
          autocomplete="current-password"
          rules="required"
        />
        <div class="card-actions justify-end">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!meta.valid || isSubmitting"
          >
            登入 (Sign In)
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Auth } from 'aws-amplify';
import { reactive, ref} from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useLoading } from 'vue-loading-overlay';
import { Form, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useI18n } from '../mixin/i18n.js'
import BaseInput from './base/BaseInput.vue'

const router = useRouter()
const store = useStore()
const $loading = useLoading();
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
    router.push('/')

  } catch (err) {
    state.errorMessage = geti18nAuthenticationErrorMessage(err.message)

  } finally {
    loader.hide()
  }
}
</script>

