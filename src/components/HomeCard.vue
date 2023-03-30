<template>
  <div class="card card-bordered shadow-xl w-full">
    <div class="card-body flex-grow-0">
      <div>
        <BaseAvatar
          :src="user.picture ? `https://www.gravatar.com/avatar/${user.picture}?s=80` : undefined"
          :text="getIntials(user.name)"
        />
        <div>
          <h5 class="my-2 font-bold text-lg leading-relaxed">
            {{ user.name }}
          </h5>
          <div
            v-if="user[UserAttributes.TAGS]"
            class="flex flex-wrap gap-2"
          >
            <div
              v-for="tag in JSON.parse(user[UserAttributes.TAGS])"
              :key="tag"
              class="badge"
            >
              {{ tag }}
            </div>
          </div>
        </div>
      </div>
      <hr>
      <p>
        <a
          class="btn btn-primary mr-2"
          :href="user[UserAttributes.CALENDLY_URL] || `mailto:${user.email}`"
          target="_blank"
        >
          預約
        </a>
        <label
          for="profile-modal"
          class="btn btn-secondary"
          @click="$emit('showProfileModal', user)"
        >
          關於我
        </label>
      </p>
      <p :id="`about-${user.sub}`">
        {{ user.profile }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { UserAttributes } from '../constants'
import BaseAvatar from './base/BaseAvatar'

defineProps({
  user: {
    type: Object,
    required: true,
  },
})

// get initials regex
function getIntials(name) {
  const allNames = name.trim().split(' ')
  const initials = allNames.reduce((acc, curr, index) => {
    if(index === 0 || index === allNames.length - 1){
      acc = `${acc}${curr.charAt(0).toUpperCase()}`
    }
    return acc
  }, '')
  return initials
}

defineEmits(['showProfileModal'])

</script>