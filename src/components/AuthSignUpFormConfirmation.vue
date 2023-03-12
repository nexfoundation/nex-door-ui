<template>
  <form
    class="flex flex-col gap-2"
    @submit.prevent="emit('submit', form)"
  >
    <div
      v-if="errorMessage"
      class="alert alert-error"
      role="alert"
    >
      {{ errorMessage }}
    </div>
    <p>(請確認您的 Email 或是簡訊的 OTP 驗證碼)</p>
    <BaseInput
      v-model="form.authCode"
      placeholder="請輸入臨時性驗證碼 (Authentication code)"
    />

    <div class="text-xs">
      沒收到驗證碼？
      <a
        class="link"
        @click="emit('resendConfirmationCode')"
      >
        點我重新發送驗證碼 {{ `(${confirmationCodeCooldownSecond} 秒)` }}
      </a>
    </div>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">
        確認 (Confirm Sign Up)
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import BaseInput from './base/BaseInput'

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

const form = reactive({
  authCode: '',
})

const emit = defineEmits(['submit'])

</script>