<template>
  <Form
    v-slot="{ meta, isSubmitting }"
    class="flex flex-col gap-2"
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
      name="form.attributes.email"
      placeholder="信箱 (Email)"
      :rules="isRequired"
    />
    <BaseInput
      name="form.username"
      placeholder="用戶名稱 (Username)"
      autocomplete="username"
      :rules="isRequired"
    />
    <BaseInput
      name="form.password"
      placeholder="密碼 (Password)"
      type="password"
      autocomplete="new-password"
      :rules="isRequired"
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
import { Form } from 'vee-validate'
import BaseInput from './base/BaseInput.vue'

defineProps({
  errorMessage: {
    type: String,
    default: '',
  },
})

function isRequired(value) {
  if (value && value.trim()) {
    return true;
  }
  return 'This is required';
}

// const isValid = useIsFormValid();

const emit = defineEmits(['submit'])
function onSubmit(values) {
  console.log(JSON.stringify(values, null, 2));
  // emit('submit', values);
}

</script>