<template>
  <div
    class="container bg-[#EEEEEE] max-h-full max-w-full py-1
 "
  >
    <div class="sm:container my-20 ">
      <!-- <div>在這裡你可以編輯你的個人資料，讓更多人更加了解你！</div> -->
      <Suspense>
        <ProfileForm />
        <template #fallback>
          <!-- TB fix  -->
          <span class="loading loading-spinner loading-lg" />
          Loading...
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import ProfileForm from './ProfileForm'

</script>
