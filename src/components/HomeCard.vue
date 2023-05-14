<template>
  <div class="card card-bordered shadow-xl w-full h-96">
    <div class="card-body flex-grow-0 overflow-hidden">
      <div>
        <BaseAvatar :src="user.picture" :text="getIntials(user.name)" />
        <div>
          <h5 class="my-2 font-bold text-lg leading-relaxed">
            {{ user.name }}
          </h5>
          <div v-if="user[UserAttributes.TAGS]" class="flex flex-wrap gap-2">
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
      <hr />
      <p>
        <label
          for="booking-modal"
          class="btn btn-primary mr-2"
          @click="$emit('showModal')"
        >
          預約
        </label>
        <label
          for="profile-modal"
          class="btn btn-secondary"
          @click="$emit('showModal', user)"
        >
          關於我
        </label>
      </p>
      <p :id="`about-${user.sub}`" class="overflow-hidden">
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
