<template>
  <div class="md:container my-20">
    <article class="prose mx-auto my-12 px-4 md:px-0">
      <h1>關於 NEX Door</h1>
      <span>串連世界各地的專家 解決各種疑難雜症</span>
      <hr>
      <p>
        NEX Door
        是一個非營利線上導師領航平台，連結世界各地菁英，創造團結互助的力量，建立台灣人互助網路。讓台灣人陪著台灣人在國際路上打開第一扇門或衝刺最後一哩路。
      </p>
      <p>
        「今日的路人是明日的引路人」，延續 Give and Take
        的精神，讓我們啟動正向迴圈，幫助更多台灣人走向世界，讓回家的路變得更好。
      </p>
      <hr>
    </article>

    <Suspense>
      <HomeCardGrid @show-modal="(u) => (state.user = u)" />
    </Suspense>

    <!--
      This is special way of making modal open/close using only daisyUI.
      Using hidden checkbox control open/close state, and wrap modal using label
      so that clicking outside of the modal close the modal.
      We can wrap this component to its own component in the future if more places use this.
    -->
    <!-- Profile modal -->
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
        <template v-if="state.user">
          <div class="flex flex-col w-full gap-6">
            <div class="flex gap-4 items-start">
              <BaseAvatar
                :src="state.user.picture"
                :text="getIntials(state.user.name)"
              />
              <div class="flex flex-col gap-2">
                <h3 class="font-bold text-2xl">
                  {{ state.user.name }}
                </h3>
                <div class="flex gap-2">
                  <a
                    v-if="state.user[UserAttributes.LINKEDIN]"
                    :href="state.user[UserAttributes.LINKEDIN]"
                  >
                    <img src="../assets/linkedin-logo.svg">
                  </a>
                  <a
                    v-if="state.user[UserAttributes.FACEBOOK]"
                    :href="state.user[UserAttributes.FACEBOOK]"
                  >
                    <img src="../assets/facebook-logo.svg">
                  </a>
                  <a
                    v-if="state.user[UserAttributes.INSTAGRAM]"
                    :href="state.user[UserAttributes.INSTAGRAM]"
                  >
                    <img src="../assets/instagram-logo.svg">
                  </a>
                </div>
                <div
                  v-if="state.user[UserAttributes.TAGS]"
                  class="flex flex-wrap gap-2"
                >
                  <div
                    v-for="tag in JSON.parse(state.user[UserAttributes.TAGS])"
                    :key="tag"
                    class="badge"
                  >
                    {{ tag }}
                  </div>
                </div>
                <p v-if="state.user.website">
                  網站:
                  <a
                    :href="state.user.website"
                    class="link"
                    target="_blank"
                  >{{
                    state.user.website
                  }}</a>
                </p>
              </div>
            </div>
            <div>
              <p v-if="state.user.profile">
                {{ state.user.profile }}
              </p>
            </div>
          </div>
        </template>
      </label>
    </label>
    <!-- Profile modal -->

    <!-- Booking modal -->
    <input
      id="booking-modal"
      type="checkbox"
      class="modal-toggle"
    >
    <label
      class="modal"
      for="booking-modal"
    >
      <label
        ref="formContainer"
        class="modal-box card w-full mx-auto shadow-xl flex flex-col"
        for=""
      >
        <div
          v-if="!isAuthenticated"
          class="card-body"
        >
          <h1 class="card-title">請先註冊/登入</h1>

          <div class="flex flex-col items-center gap-2 mt-8">
            <router-link
              class="btn btn-primary btn-wide"
              to="/auth"
            >
              註冊
            </router-link>
            <router-link
              class="btn btn-secondary btn-wide"
              to="/auth?tab=signIn"
            >
              登入
            </router-link>
          </div>
        </div>
        <div
          v-else
          class="card-body"
        >
          <h1 class="card-title">確認你的預約</h1>
          <div
            v-if="state.errorMessage"
            class="alert alert-error"
            role="alert"
          >
            {{ state.errorMessage }}
          </div>
          <BookingConfirmation @submit="onSubmit" />
        </div>
      </label>
    </label>
    <!-- Booking modal -->
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { UserAttributes } from '../constants'
import { API } from 'aws-amplify'
import BaseAvatar from './base/BaseAvatar'
import HomeCardGrid from './HomeCardGrid'
import BookingConfirmation from './BookingConfirmation'

const store = useStore()

const formContainer = ref(null);

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

const isAuthenticated = computed(() => {
  return store.state.isAuthenticated
})

const apiName = 'ServiceEndpoint';
const path = 'submit';

const state = reactive({
  user: undefined,
  errorMessage: '',
});

async function onSubmit(values) {
  state.errorMessage = '';

  const info = {
    body: {
      recipient_uuid: state.user.sub,
      message: values.note,
    },
  };

  try {
    await API.post(apiName, path, info);
    document.getElementById('booking-modal').checked = false;
  } catch (err) {
    state.errorMessage = err;
  }
}
</script>
