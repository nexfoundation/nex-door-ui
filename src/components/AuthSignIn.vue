<template>
  <div class="card w-96 mx-auto shadow-xl">
    <div class="card-body">
      <h1 class="card-title">
        登入 Sign In
      </h1>
      <div
        v-if="errorMessage"
        class="alert alert-error"
        role="alert"
      >
        {{ errorMessage }}
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
import { reactive } from 'vue'
import { Form, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useI18n } from '../mixin/i18n.js'
import BaseInput from './base/BaseInput.vue'

const { geti18nAuthenticationErrorMessage } = useI18n()

defineRule('required', required)

const errorMessage = reactive('')

async function onSubmit() {
  if (this.form.username == '' || this.form.password == '') {
    this.errorMessage = '請填寫用戶名稱或密碼！'
    return
  }
  // this.$refs.loadingBar.doAjax(true);
  try {
    const user = await Auth.signIn(this.form.username, this.form.password)
    this.$store.dispatch('setIsAuthenticated', true)
    this.$store.dispatch('setUser', user)
    this.$router.push('/')
    // this.$refs.loadingBar.doAjax(false);
  } catch (err) {
    // this.$refs.loadingBar.doAjax(false);
    console.error(err)
    console.log('error: ', err)
    this.errorMessage = geti18nAuthenticationErrorMessage(err.message)
  }
}
</script>

