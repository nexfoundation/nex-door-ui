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
      label="信箱 (Email)"
      placeholder="信箱 (Email)"
      rules="required|email"
    />
    <BaseInput
      id="name"
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
      autocomplete="new-password"
      rules="required|min:8"
    />
    <div class="card-actions justify-end">
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!meta.valid || isSubmitting"
      >
        註冊 (Sign Up)
      </button>
    </div>
  </Form>
</template>

<script setup>
import { defineProps } from 'vue'
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

</script>