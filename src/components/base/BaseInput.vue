<template>
  <input
    class="input input-bordered w-full max-w-xs"
    :id="id"
    :placeholder="placeholder"
    :type="type"
    :autocomplete="autocomplete"
    :readonly="readonly"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    id: String,
    placeholder: String,
    value: String,
    autocomplete: String,
    type: {
      type: String,
      default() {
        return 'text'
      }
    },
    readonly: Boolean,
  },
  emits: ['update:value']
}
</script>
