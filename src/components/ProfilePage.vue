<template>
  <div class="md:container my-20">
    <div>在這裡你可以編輯你的個人資料，讓更多人更加了解你！</div>
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
