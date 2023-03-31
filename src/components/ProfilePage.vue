<template>
  <div class="md:container my-20">
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
import ProfileForm from './ProfileForm'

</script>
