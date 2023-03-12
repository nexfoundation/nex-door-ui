<template>
  <Field
    :id="id"
    class="input input-bordered w-full max-w-xs"
    :autocomplete="autocomplete"
    :name="name"
    :placeholder="placeholder"
    :readonly="readonly"
    :rules="rules"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <ErrorMessage :name="name" />
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
    default: undefined,
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
