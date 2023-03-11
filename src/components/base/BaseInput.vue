<template>
  <input
    :id="id"
    class="input input-bordered w-full max-w-xs"
    :placeholder="placeholder"
    :type="type"
    :autocomplete="autocomplete"
    :readonly="readonly"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
export default {
  props: {
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
  },
  emits: ['update:modelValue']
}
</script>
