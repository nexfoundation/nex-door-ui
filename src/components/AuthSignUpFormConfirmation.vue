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
    <p>(請確認您的 Email OTP 驗證碼)</p>
    <BaseInput
      name="authCode"
      placeholder="請輸入臨時性驗證碼 (Authentication code)"
      rules="required"
    />

    <div class="text-xs">
      沒收到驗證碼？
      <a
        class="link"
        @click="$emit('resendConfirmationCode')"
      >
        點我重新發送驗證碼 {{ `(${confirmationCodeCooldownSecond} 秒)` }}
      </a>
    </div>
    <div class="card-actions justify-end">
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!meta.valid || isSubmitting"
      >
        確認 (Confirm Sign Up)
      </button>
    </div>
  </Form>
</template>

<script setup>
import { Form, defineRule } from 'vee-validate'
import { required } from '@vee-validate/rules'
import BaseInput from './base/BaseInput'

defineRule('required', required)

defineProps({
  confirmationCodeCooldownSecond: {
    type: Number,
    default: 0,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit', 'resendConfirmationCode'])
function onSubmit(values) {
  emit('submit', values)
}

</script>