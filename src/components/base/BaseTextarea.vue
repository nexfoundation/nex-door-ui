<template>
  <div class="form-control">
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
      <textarea
        :id="id"
        v-bind="field"
        class="textarea textarea-bordered max-w-md"
        :class="{
          'textarea-disabled': disabled,
          'textarea-error': meta.touched && !meta.valid,
        }"
        :rows="rows"
        :placeholder="placeholder"
      />
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
  rules: {
    type: String,
    default: undefined,
  },
  disabled: Boolean,
  rows: {
    type: Number,
    default: 5,
  },
  helpText: {
    type: String,
    default: undefined,
  },
})

defineEmits(['update:modelValue'])
</script>