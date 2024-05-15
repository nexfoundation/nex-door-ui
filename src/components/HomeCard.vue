<template>
  <div class="card card-bordered shadow-xl xl:w-[25rem] w-full h-80  bg-white">
    <div class="card-body flex-grow-0 overflow-hidden lg:space-y-4 gap-4 p-6">
      <div class="flex flex-row  gap-4 self-stretch">
        <BaseAvatar class="flex-none size-20 h-max" :src="user.picture" :text="getIntials(user.name)" />
        <div class="flex flex-col self-stretch justify-center gap-1">
          <h2 class="font-bold text-2xl">{{ user.name }}</h2>
          <span class="font-medium"> {{ user[UserAttributes.TITLE] }}</span>
          <div class="flex flex-row space-x-1 " :class="{ 'hidden': !user[UserAttributes.COUNTRY_CODE] }">
            <svg class="h-6 w-6 text-gray-500 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="#666666" />
            </svg>
            <!-- alt icon -->
            <!-- <svg class="h-4 w-4 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />  <circle cx="12" cy="10" r="3" /></svg> -->
            <span class="font-medium"> {{ user[UserAttributes.COUNTRY_CODE] }}</span>
          </div>
        </div>
      </div>
      <div v-if="user[UserAttributes.TAGS]" class=" flex gap-2 w-3/4 overflow-hidden whitespace-nowrap">
        <div v-for="tag in JSON.parse(user[UserAttributes.TAGS])" :key="tag"
          class="badge-lg badge-primary bg-secondary text-black-secondary rounded text-sm gap-[0.625rem] py-1 px-[0.63rem]">
          {{ tag }}
        </div>
      </div>
      <hr>
      <!-- <div class="flex gap-2">
        <label for="booking-modal" class="btn btn-primary" @click="$emit('showModal')">
          預約
        </label>
        <label for="profile-modal" class="btn btn-secondary" @click="$emit('showModal')">
          關於我
        </label>
      </div> -->
      <p :id="`about-${user.sub}`" class="overflow-hidden line-clamp-3">
        {{ user.profile }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { UserAttributes } from '../constants';
import BaseAvatar from './base/BaseAvatar';

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// get initials regex
function getIntials(name) {
  // Adhoc fix: guard clause for no input cuz data wont show
  if (!name || typeof name !== 'string') {
    return '';
  }

  const allNames = name.trim().split(' ');
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
  return initials;
}

defineEmits(['showModal']);
</script>
