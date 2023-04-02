<template>
  <div
    v-if="state.users"
    class="grid grid-cols-1 lg:grid-cols-3 gap-4 my-12"
  >
    <HomeCard
      v-for="user in usersAcceptMentoring"
      :key="user.sub"
      :user="user"
      @show-profile-modal="$emit('showProfileModal', user)"
    />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { API } from 'aws-amplify'
import { UserAttributes } from '../constants'
import HomeCard from './HomeCard'

const apiName = 'ServiceEndpoint'
const path = '/query'

const state = reactive({
  users: [],
  modalCurrentUser: undefined,
})

try {
  const response = await API.get(apiName, path)
  const users = response.map(u => u.Attributes.reduce((result, a) => {
    result[a.Name] = a.Value
    return result
  }, {}))
  state.users = users
} catch(error) {
  console.error(error)
}

const usersAcceptMentoring = computed(() =>
  state.users.filter(u => u[UserAttributes.ACCEPT_MENTORING] === "1")
)

defineEmits(['showProfileModal'])

</script>
