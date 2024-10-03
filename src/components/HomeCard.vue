<!-- Information Card  -->
<template>
  <label for="profile-modal" class="card card-bordered shadow-xl w-[340px] 2xl:w-[400px] h-[420px] bg-white sm:mx-3 md:mx-0" @click="$emit('showModal')">
    <div class="card-body flex-grow-0 overflow-hidden gap-4 p-6">
      <div class="flex flex-row  gap-4 self-stretch">
        <BaseAvatar class="flex-none size-20 h-max" :src="user.picture" :text="getIntials(user.name)" />
        <div class="flex flex-col self-stretch justify-center gap-1">
          <h2 class="font-bold text-2xl">{{ user.name }}</h2>
          <span class="font-medium line-clamp-1"> {{ user[UserAttributes.TITLE] }}</span>
          <CountryWidget :country-code="user[UserAttributes.COUNTRY_CODE]" />
        </div>
      </div>
      <div v-if="user[UserAttributes.TAGS]" class="flex gap-2 w-3/4 overflow-hidden whitespace-nowrap">
        <div
          v-for="tag in user[UserAttributes.TAGS]" :key="tag"
          class="badge-lg badge-primary bg-secondary text-black-secondary rounded text-sm gap-[0.625rem] py-1 px-[0.63rem]"
        >
          {{ tag }}
        </div>
      </div>
      <hr>
      <p :id="`about-${user.uid}`" class="overflow-hidden line-clamp-3">
        {{ user.profileBio }}
      </p>
      <div v-if="user[UserAttributes.DESC_WHAT_CAN_I_HELP]" class="bg-[#F4F6FA] rounded-[0.25rem] gap-4 flex flex-col p-2">
        <h3 class=" font-bold text-lg">我可以提供哪些幫助?</h3>
        <p class="line-clamp-3 text-base leading-[140%]">{{ user[UserAttributes.DESC_WHAT_CAN_I_HELP] }}</p>
      </div>
    </div>
  </label>
</template>

<script setup>
import { UserAttributes } from '../constants';
import BaseAvatar from './base/BaseAvatar.vue';
import CountryWidget from './base/BaseCountryWidget.vue'

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
