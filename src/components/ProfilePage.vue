<template>
  <div class="container my-20">
    <div
      v-if="errorMessage"
      class="alert alert-danger"
      role="alert"
    >
      {{ errorMessage }}
    </div>
    <h1 class="text-5xl font-bold leading-relaxed">
      歡迎回來！
    </h1>
    <p>在這裡你可以編輯你的個人資料，以讓更多人更加了解你！</p>
    <Suspense>
      <ProfileForm />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import ProfileForm from './ProfileForm'

const errorMessage = reactive('')
</script>
