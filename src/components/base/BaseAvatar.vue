<template>
  <div
    class="avatar"
    :class="{placeholder: !src}"
  >
    <div
      class="w-20 rounded-full"
      :class="{
        'bg-neutral-focus': !src,
        'text-neutral-content': !src,
      }"
    >
      <img
        v-if="src"
        :src="src"
      >
      <span
        v-if="!src"
        class="text-2xl"
      >{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    default: undefined,
  },
  text: {
    type: String,
    default: '',
  },
})
</script>