<template>
  <div
    class="avatar"
    :class="{placeholder: !src}"
  >
    <div
      class="w-20 rounded-full"
      :class="{
        'bg-[#F4F6FA]': !src,
        'text-[#1E2122]': !src,
      }"
    >
      <img
        v-if="src"
        :src="src"
      >
      <span
        v-if="!src"
        class="text-[2.25rem] font-medium w-18"
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