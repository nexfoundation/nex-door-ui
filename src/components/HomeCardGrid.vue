<template>
  <div>
    <div class=" ">
      <HomeCardGridFilterCountry @selectedTags-updated="handleSelectedCountryTagsUpdate"></HomeCardGridFilterCountry>
      <HomeCardGridFilterTags @selectedTags-updated="handleSelectedTagsUpdate"></HomeCardGridFilterTags>

      <div v-if="state.users" class="grid grid-cols-1 lg:grid-cols-3 gap-4 my-12">
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
import HomeCard from './HomeCard';
import HomeCardGridFilterTags from "./HomeCardGridFilterTags.vue";
import HomeCardGridFilterCountry from './HomeCardGridFilterCountry.vue';

const apiName = 'ServiceEndpoint';
const path = '/query';
// console.log(process.env.VUE_APP_COG_CLIENT_ID);
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
  const users = response.map((u) =>
    u.Attributes.reduce((result, a) => {
      result[a.Name] = a.Value;
      return result;
    }, {})
  );
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
