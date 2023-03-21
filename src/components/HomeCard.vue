<template>
  <div class="card card-bordered shadow-xl w-full">
    <div class="card-body">
      <div>
        <img
          :src="pictureUrl"
          class="mr-3"
        >
        <div>
          <h5 class="mt-0">
            {{ name }}
          </h5>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tag in tags"
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
          :class="{ 'btn-disabled': !calendlyUrl }"
          :href="calendlyUrl"
          target="_blank"
        >
          預約
        </a>
        <label
          for="profile-modal"
          class="btn btn-secondary"
          @click="showIntroModal(user)"
        >
          關於我
        </label>
      </p>
      <p :id="`about-${id}`">
        {{ profile }}
      </p>
    </div>
  </div>
</template>

<script>
import { UserAttributes } from '../constants'

export default {
  props: {
    user: {
      type: Object,
      default: undefined,
    },
    showIntroModal: {
      type: Function,
      default: () => {},
    }
  },
  data() {
    const attributes = this.user.Attributes.reduce((result, a) => {
      result[a.Name] = a.Value;
      return result;
    }, {});

    return {
      attributes,
    };
  },
  computed: {
    id() {
      return this.attributes.sub;
    },
    pictureUrl() {
      return `https://www.gravatar.com/avatar/${this.attributes.picture}?s=80`;
    },
    name() {
      return this.attributes.name;
    },
    tags() {
      if (!this.attributes[UserAttributes.TAGS]) {
        return;
      }

      return JSON.parse(this.attributes[UserAttributes.TAGS]);
    },
    calendlyUrl() {
      if (!this.attributes[UserAttributes.CALENDLY_URL]) {
        return;
      }
      return this.attributes[UserAttributes.CALENDLY_URL];
    },
    website() {
      return this.attributes.website;
    },
    profile() {
      return this.attributes.profile;
    },
  },
}
</script>