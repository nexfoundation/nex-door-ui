<template>
  <Form
    v-slot="{ meta, isSubmitting }"
    class="flex flex-col"
    @submit="onSubmit"
  >
    <div
      v-if="errorMessage"
      class="alert alert-error"
      role="alert"
    >
      {{ errorMessage }}
    </div>
    <BaseInput
      id="email"
      name="attributes.email"
      label="電子信箱"
      placeholder="abc@xyz.com"
      rules="required|email"
    />
    <BaseInput
      id="name"
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
      autocomplete="new-password"
      rules="required|min:8"
    />
    <div class="card-actions flex-col items-center mt-2">
      <button
        type="submit"
        class="btn btn-primary w-full"
        :disabled="!meta.valid || isSubmitting"
      >
        註冊
      </button>
      <span>或</span>
      <button
        type="button"
        class="btn btn-primary btn-outline w-full"
        @click="googleIDPLogin"
      >
        Google 註冊
      </button>
    </div>
  </Form>
</template>

<script setup>
import { Auth } from 'aws-amplify'
import { Form, defineRule } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import BaseInput from './base/BaseInput'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit'])
function onSubmit(values) {
  emit('submit', values)
}

async function googleIDPLogin() {
  Auth.federatedSignIn({provider: 'Google'})
}

</script>