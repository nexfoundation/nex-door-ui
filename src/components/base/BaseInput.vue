<template>
  <div class="mb-4">
    <Field
      v-slot="{ field, meta }"
      :name="name"
      :rules="rules"
    >
      <input
        :id="id"
        v-bind="field"
        :autocomplete="autocomplete"
        :readonly="readonly"
        class="input input-bordered w-full max-w-xs"
        :class="{ 'input-error': meta.touched && !meta.valid }"
        :type="type"
        :placeholder="placeholder"
      >
    </Field>
    <label class="label">
      <span class="label-text-alt"><ErrorMessage :name="name" /></span>
    </label>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'

defineProps({
  id: {
    type: String,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  autocomplete: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default() {
      return 'text'
    }
  },
  readonly: Boolean,
  rules: {
    type: Function,
    default() {
      return true
    }
  }
})

defineEmits(['update:modelValue'])
</script>
