<template>
  <div class="form-control w-full max-w-md">
    <label
      v-if="label || $slots.label"
      class="label cursor-pointer"
      :for="id"
    >
      <span class="label-text">
        <slot name="label">{{ label }}</slot>
      </span>
    </label>
    <Field
      v-slot="{ field, meta, errorMessage }"
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
      <label
        v-if="helpText || $slots.helpText"
        class="label"
      >
        <span class="label-text-alt">
          <slot name="helpText">{{ helpText }}</slot>
        </span>
      </label>
      <label
        v-if="errorMessage && meta.touched"
        class="label"
      >
        <span class="label-text-alt text-error">{{ errorMessage }}</span>
      </label>
    </Field>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'

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
  helpText: {
    type: String,
    default: undefined,
  },
})

defineEmits(['update:modelValue'])
</script>
