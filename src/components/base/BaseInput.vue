<template>
  <div class="form-control w-full max-w-xs">
    <label
      v-if="label"
      class="label cursor-pointer"
      :for="id"
    >
      <span class="label-text">
        <slot name="label">{{ label }}</slot>
      </span>
    </label>
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
        class="input input-bordered"
        :class="{
          'input-disabled': disabled,
          'input-error': meta.touched && !meta.valid,
        }"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
      >
    </Field>
    <label class="label">
      <span class="label-text-alt text-error"><ErrorMessage :name="name" /></span>
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
  label: {
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
    default: 'text',
  },
  readonly: Boolean,
  rules: {
    type: String,
    default: undefined,
  },
  disabled: Boolean,
})

defineEmits(['update:modelValue'])
</script>
