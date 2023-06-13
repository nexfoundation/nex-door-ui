<template>
  <div>
    <div class=" ">
      <HomeCardGridFilter @selectedTags-updated="handleSelectedTagsUpdate">></HomeCardGridFilter>
    </div>

    <div v-if="state.users" class="grid grid-cols-1 lg:grid-cols-3 gap-4 my-12">
      <HomeCard v-for="user in usersFiltered" :key="user.sub" :user="user" @show-modal="$emit('showModal', user)" />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { API } from 'aws-amplify';
import { UserAttributes } from '../constants';
import HomeCard from './HomeCard';
import HomeCardGridFilter from "./HomeCardGridFilter.vue";

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
  // console.log(selectedTags)
  // console.log(state.filters)
}

const usersFiltered = computed(() => {
  return state.users.filter((u) => 
    u[UserAttributes.ACCEPT_MENTORING] === '1' &&
    u[UserAttributes.TAGS].includes(state.filters.tags)
  );
});

defineEmits(['showModal']);
</script>
