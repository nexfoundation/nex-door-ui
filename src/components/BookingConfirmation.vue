<template>
  <Form
    v-slot="{ meta, isSubmitting }"
    class="flex flex-col"
    @submit="onSubmit"
  >
    <BaseInput
      id="email"
      name="email"
      label="信箱"
      autocomplete="email"
      placeholder="abc@xyz.com"
      rules="required|email"
    />
    <BaseTextarea id="note" name="note" label="留下訊息" :rows="5" />
    <BaseInput
      id="availableTime"
      name="availableTime"
      :label="userToggled ? '有空時間 (' + userToggled[UserAttributes.TIMEZONE] + ')' : '有空時間'"
      placeholder="ex: Mon-Wed 9-12AM"
      rules="required"
    />
    <div class=" block text-sm font-medium text-slate-700">
        {{ userToggled.name }} 提議:  
        {{ userToggled[UserAttributes.AVAILABLE_TIME] }}
    </div>
    <div class="card-actions flex-col items-center mt-2 modal-action">
      <button
        type="submit"
        class="btn btn-primary w-full"
        :disabled="!meta.valid || isSubmitting"
      >
        確認預約
      </button>
    </div>
  </Form>
</template>

<script setup>
import { Form, defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { UserAttributes } from '../constants';
import BaseInput from './base/BaseInput';
import BaseTextarea from './base/BaseTextarea';

defineRule('required', required);
defineRule('email', email);
defineProps({
  userToggled: {
    type: Object,
    default: () => ({ }),
  }
})

const emit = defineEmits(['submit']);
function onSubmit(values, { resetForm }) {
  emit('submit', values);
  resetForm();
}
</script>
