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
    <div class="card-actions flex-col items-center mt-4">
      <button
        type="submit"
        class="text-center content-center bg-gradient-to-r from-[#6FD7FD] to-[#47DE7899]/[0.6] hover:from-[#9FE4FE] hover:to-[#C6F5D5] border-none w-full h-[48px] rounded-[100px] text-black text-[20px] disabled:bg-[#E5E8EE] font-medium"
        :disabled="!meta.valid || isSubmitting"
      >
        註冊
      </button>
      <span>或</span>
      <button
        type="button"
        class="btn btn-secondary btn-outline w-full !text-black border-secondary-blue text-[20px] rounded-[100px] font-medium border-[2px] normal-case"
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