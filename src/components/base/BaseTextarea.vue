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
      <textarea
        :id="id"
        v-bind="field"
        class="textarea textarea-bordered max-w-md"
        :class="{
          'textarea-disabled': disabled,
          'textarea-error': meta.touched && !meta.valid,
        }"
        :rows="rows"
      />
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
  rows: {
    type: Number,
    default: 5,
  }
})

defineEmits(['update:modelValue'])
</script>