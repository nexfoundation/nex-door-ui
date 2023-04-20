<template>
  <div class="form-control w-full max-w-xs">
    <label
      v-if="label"
      class="label cursor-pointer"
      :for="id"
    >
      <span class="label-text">{{ label }}</span>
    </label>
    <Field
      v-slot="{ field, meta, errorMessage }"
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
      <label
        v-if="helpText"
        class="label"
      >
        <span class="label-text-alt">{{ helpText }}</span>
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
  rules: {
    type: String,
    default: undefined,
  },
  disabled: Boolean,
  options: {
    type: Array[Object],
    default: [],
  },
  helpText: {
    type: String,
    default: undefined,
  },
})

defineEmits(['update:modelValue'])
</script>