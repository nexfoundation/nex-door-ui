<template>
  <div class="form-control">
    <label
      v-if="label"
      class="label cursor-pointer"
      :for="id"
    >
      <span class="label-text">{{ label }}</span>
    </label>
    <Field
      v-slot="{ field, meta }"
      :name="name"
      :rules="rules"
    >
      <select
        :id="id"
        v-bind="field"
        class="select select-bordered w-full max-w-xs"
        :class="{
          'select-disabled': disabled,
          'select-error': meta.touched && !meta.valid,
        }"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
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
  rules: {
    type: String,
    default: undefined,
  },
  disabled: Boolean,
  options: {
    type: Array[Object],
    default: [],
  },
})

defineEmits(['update:modelValue'])
</script>