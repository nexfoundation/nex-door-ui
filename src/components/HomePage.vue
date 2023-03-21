<template>
  <div class="container my-20">
    <article class="prose mx-auto my-12">
      <h1>關於 NEX Door</h1>
      <span>串連世界各地的專家 解決各種疑難雜症</span>
      <hr>
      <p>NEX Door 是一個非營利線上導師領航平台，連結世界各地菁英，創造團結互助的力量，建立台灣人互助網路。讓台灣人陪著台灣人在國際路上打開第一扇門或衝刺最後一哩路。</p>
      <p>「今日的路人是明日的引路人」，延續 Give and Take 的精神，讓我們啟動正向迴圈，幫助更多台灣人走向世界，讓回家的路變得更好。</p>
      <hr>
    </article>


    <div
      v-if="users"
      class="grid grid-cols-1 lg:grid-cols-3 gap-8 my-12"
    >
      <HomeCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        :show-intro-modal="showIntroModal"
      />
    </div>

    <!--
      This is special way of making modal open/close using only daisyUI.
      Using hidden checkbox control open/close state, and wrap modal using label
      so that clicking outside of the modal close the modal.
      We can wrap this component to its own component in the future if more places use this.
    -->
    <input
      id="profile-modal"
      type="checkbox"
      class="modal-toggle"
    >
    <label
      class="modal"
      for="profile-modal"
    >
      <label
        class="modal-box flex"
        for=""
      >
        <img
          :src="`https://www.gravatar.com/avatar/${modalCurrentUserAttributes.picture}?s=80`"
          class="mr-3"
        >
        <div>
          <h3 class="font-bold text-lg">
            {{ modalCurrentUserAttributes.name }}
          </h3>
          <p v-if="modalCurrentUserAttributes.website">
            網站: <a
              :href="modalCurrentUserAttributes.website"
              class="link"
              target="_blank"
            >{{ modalCurrentUserAttributes.website }}</a>
          </p>
        </div>
      </label>
    </label>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import HomeCard from './HomeCard.vue';
export default {
  name: 'HomePage',
  components: {
    HomeCard,
  },
  data() {
    return {
      users: [],
      intro: [],
      modalCurrentUser: undefined,
    }
  },
  computed: {
    modalCurrentUserAttributes() {
      if (!this.modalCurrentUser) {
        return {
          name: '',
          picture: '',
          website: '',
        }
      }
      const {name, picture, website} = this.modalCurrentUser.Attributes.reduce((result, a) => {
        result[a.Name] = a.Value;
        return result;
      }, {});

      return {
        name,
        picture,
        website,
      }
    }
  },
  async created() {
    const apiName = 'ServiceEndpoint'
    const path = '/query'
    const myInit = { // OPTIONAL
      headers: {}, // OPTIONAL
    };

    try {
      const response = await API.get(apiName, path, myInit);
      this.users = response;
    } catch(error) {
      console.error(error);
    }
  },
  methods: {
    showIntroModal(user) {
      this.modalCurrentUser = user
    },
  }
}
</script>
