<template>
  <div class="card card-bordered shadow-xl w-full h-96">
    <div class="card-body flex-grow-0 overflow-hidden">
      <div>
        <BaseAvatar
          :src="user.picture"
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
      <div class="flex gap-2">
        <label
          for="booking-modal"
          class="btn btn-primary"
          @click="$emit('showModal')"
        >
          預約
        </label>
        <label
          for="profile-modal"
          class="btn btn-secondary"
          @click="$emit('showModal')"
        >
          關於我
        </label>
      </div>
      <p
        :id="`about-${user.sub}`"
        class="overflow-hidden line-clamp-3 mt-4"
      >
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
