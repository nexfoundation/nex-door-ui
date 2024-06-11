<template>
  <div>
    <div class="flex flex-col place-items-center">
      <div class="flex justify-center align-middle py-6 px-4 md:m-12 mx-4 my-6">
        <div class="flex flex-col bg-white rounded-xl py-6 px-4 md:w-[644px] p-10 shadow-[0_10px_30px_0px_rgba(0,0,0,0.05)] gap-3">
          <HomeCardGridFilterCountry class=" " @selectedTags-updated="handleSelectedCountryTagsUpdate"></HomeCardGridFilterCountry>
          <HomeCardGridFilterTags class="flex self-center"  @selectedTags-updated="handleSelectedTagsUpdate"></HomeCardGridFilterTags>
        </div>
      </div>

      <div v-if="state.users" class="flex flex-wrap gap-4 px-4 py-6 justify-center mx-4 my-6 md:mx-4 md:my-12 xl:mx-20 max-w-[1280px] ">
        <HomeCard v-for="user in usersFiltered" :key="user.sub" :user="user" @show-modal="$emit('showModal', user)" />
        <div v-if="usersFiltered.length == 0">
          <p>找不到符合條件的導師呦🫠</p>
        </div>
      </div>
      <div v-else>
        <p>資料庫壞了😥</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { API } from 'aws-amplify';
import { UserAttributes } from '../constants';
import { userToCard } from '../helpers';
import HomeCard from './HomeCard';
import HomeCardGridFilterTags from "./HomeCardGridFilterTags.vue";
import HomeCardGridFilterCountry from './HomeCardGridFilterCountry.vue';

const apiName = 'ServiceEndpoint';
const path = '/query';
const state = reactive({
  users: [],
  modalCurrentUser: undefined,
  filters: {
    country: '',
    tags: ''
  }
});

try {
  const response = await API.get(apiName, path);
  const users = response.map(userToCard);
  state.users = users;
} catch (error) {
  console.error(error);
}
const handleSelectedTagsUpdate = (selectedTags) => {
  state.filters.tags = selectedTags
}
const handleSelectedCountryTagsUpdate = (selectedCountryObj) => {
  state.filters.country = selectedCountryObj
}

const usersFiltered = computed(() => {
  return state.users.filter((u) => {
    // Check if the user accepts mentoring and includes the necessary tags
    const baseCheck = u[UserAttributes.ACCEPT_MENTORING] === '1' && u[UserAttributes.TAGS]?.includes(state.filters.tags);

    // If country filter is null, ignore the country code check
    if (!state.filters.country) {
      return baseCheck;
    }

    // If country filter is not null, include the country code check
    return baseCheck && u[UserAttributes.COUNTRY_CODE] == state.filters.country.value;
  });
});

defineEmits(['showModal']);
</script>
