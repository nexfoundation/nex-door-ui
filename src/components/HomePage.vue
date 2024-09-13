<template>
  <section class="my-20 lg:container lg:px-60 md:px-30 px-4">
    <article class="mx-auto my-12 px-4 lg:px-0 gap-9 flex flex-col ">
      <h1 class="text-[3rem] font-bold font-logo">
        Welcome to NEX Door
      </h1>
      <span class="text-xl font-bold">串連世界各地的專家，解決各種疑難雜症</span>
      <hr>
      <div class="text-lg font-medium">
        <p>
          NEX Door
          是一個非營利線上導師領航平台，連結世界各地菁英，創造團結互助的力量，建立台灣人互助網路。
        </p>
      </div>
      <div class="[&_*]:rounded-[6.25rem] [&_*]:w-[10rem] [&_*]:h-[3rem] [&_*]:text-black [&_*]:text-[1.25em] flex gap-[1.5rem] [&_*]:leading-7">
        <router-link to="/auth?tab=signIn" class="btn bg-gradient-to-r from-[#6FD7FD] to-[#47DE78] border-none !w-[200px]">
          立即登入
        </router-link>
        <router-link to="/auth" class="btn bg-white border-secondary-blue border-[2px] !w-[200px]">
          快速註冊
        </router-link>
      </div>
    </article>
  </section>
  <div>
    <div class=" w-screen bg-gradient-to-r from-[#C6F5D5] to-[#6fd7fd66] px-20 py-8 px-3 flex flex-col gap-6 md:py-10 md:px-4 xl:px-60 xl:py-12 ">
      <h2 class="text-2xl font-bold text-center">
        三步驟幫你擴展海外人脈
      </h2>
      <span class="join flex flex-col md:flex-row [&>*]:{w-[15rem]} gap-5 self-stretch justify-center">
        <div class="avatar p-5 gap-6 font-medium backdrop-blur-[20px] bg-white/40 rounded-[0.5rem]">
          <div class="w-12 h-max rounded-full bg-white text-accent-blue p-[0.625rem] text-center self-center">1</div>
          <p class="">透過篩選國家與諮詢主題，認識海外專業人才。</p>  
        </div>
        <div class="avatar p-5 gap-6 font-medium backdrop-blur-[20px] bg-white/40 rounded-[0.5rem]">
          <div class="w-12 h-max rounded-full bg-white text-accent-blue p-[0.625rem] text-center self-center">2</div>
          <p>點選導師簡介，深入了解經歷與可提供的諮詢方向。</p>  
        </div>
        <div class="avatar p-5 gap-6 font-medium backdrop-blur-[20px] bg-white/40 rounded-[0.5rem]">
          <div class="w-12 h-max rounded-full bg-white text-accent-blue p-[0.625rem] text-center self-center">3</div>
          <p>登入會員即可送出留言給導師，擴展你的海外人脈！</p>  
        </div>
      </span>
    </div>
    <Suspense>
      <HomeCardGrid @show-modal="(u) => (state.user = u)" />
    </Suspense>

    <!--
      This is special way of making modal open/close using only daisyUI.
      Using hidden checkbox control open/close state, and wrap modal using label
      so that clicking outside of the modal close the modal.
      We can wrap this component to its own component in the future if more places use this.
    -->
    <!-- Profile Card modal -->
    <input id="profile-modal" ref="profileModalInput" type="checkbox" class="modal-toggle" @change="modalChange">
    <label class="modal" for="profile-modal">
      <label class="modal-box flex flex-col sm:w-[520px] drop-shadow-[4_4px_4px_rgba(0,0,0,0.125)] " for="">
        <template v-if="state.user">
          <div class="flex flex-col w-full gap-4 xs:gap-6">
            <div class="flex flex-col xs:flex-row gap-4 items-start">
              <BaseAvatar :src="state.user.picture" :text="getIntials(state.user.name)" class="[&>div]:!w-[168px] justify-center self-center xs:self-start" />
              <div class="flex flex-col xs:gap-2">
                <h3 class="font-bold text-2xl">
                  {{ state.user.name }}
                </h3>
                <div class=" flex line-clamp-2 overflow-hidden">{{ state.user[UserAttributes.TITLE] }}</div>
                <BaseCountryWidget :country-code="state.user[UserAttributes.COUNTRY_CODE]" />
                <div class="flex flex-row self-stretch gap-2">
                  <a v-if="state.user.website" :href="state.user.website" class="w-[36px] h-[36px] bg-[#E5E8EE] rounded-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z" fill="black" />
                    </svg>
                  </a>
                  <a v-if="state.user.email" :href="state.user.email" class="w-[36px] h-[36px] bg-[#E5E8EE] rounded-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="black" />
                    </svg>
                  </a>
                  <a v-if="state.user[UserAttributes.LINKEDIN]" :href="state.user[UserAttributes.LINKEDIN]" class="w-[36px] h-[36px] bg-[#E5E8EE] rounded-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19.868 2.625H4.13203C3.3 2.625 2.625 3.3 2.625 4.13203V19.868C2.625 20.7 3.3 21.375 4.13203 21.375H19.868C20.7 21.375 21.375 20.7 21.375 19.868V4.13203C21.375 3.3 20.7 2.625 19.868 2.625ZM19.868 19.875C9.37266 19.8727 4.125 19.8703 4.125 19.868C4.12734 9.37266 4.12969 4.125 4.13203 4.125C14.6273 4.12734 19.875 4.12969 19.875 4.13203C19.8727 14.6273 19.8703 19.875 19.868 19.875ZM5.40469 9.65391H8.18672V18.6023H5.40469V9.65391ZM6.79688 8.43047C7.68516 8.43047 8.40937 7.70859 8.40937 6.81797C8.40937 6.60621 8.36767 6.39653 8.28663 6.20089C8.2056 6.00525 8.08682 5.82749 7.93709 5.67776C7.78735 5.52802 7.60959 5.40925 7.41395 5.32821C7.21831 5.24718 7.00863 5.20547 6.79688 5.20547C6.58512 5.20547 6.37544 5.24718 6.1798 5.32821C5.98416 5.40925 5.8064 5.52802 5.65667 5.67776C5.50693 5.82749 5.38815 6.00525 5.30712 6.20089C5.22608 6.39653 5.18437 6.60621 5.18437 6.81797C5.18203 7.70859 5.90391 8.43047 6.79688 8.43047ZM12.7102 14.175C12.7102 13.0078 12.9328 11.8781 14.3789 11.8781C15.8039 11.8781 15.825 13.2117 15.825 14.25V18.6023H18.6047V13.6945C18.6047 11.2852 18.0844 9.43125 15.2695 9.43125C13.9172 9.43125 13.0102 10.1742 12.6375 10.8773H12.6V9.65391H9.93047V18.6023H12.7102V14.175Z" fill="black" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div v-if="state.user[UserAttributes.TAGS]" class="flex flex-wrap self-stretch content-start  gap-2 line-clamp-2 overflow-hidden">
              <div v-for="tag in JSON.parse(state.user[UserAttributes.TAGS])" :key="tag" class="badge w-[80px] h-[28px] rounded-[8px] mb-2 mr-2 !p-[12px]  text-sm text-center self-center bg-secondary border-none text-black-secondary">
                {{ tag }}
              </div>
            </div>
            <div>
              <p v-if="state.user.profile">
                {{ state.user.profile }}
              </p>
              <!-- almost repeated code on homecard.vue -->
              <div v-if="state.user[UserAttributes.DESC_WHAT_CAN_I_HELP]" class="bg-[#F4F6FA] rounded-[0.25rem] gap-4 flex flex-col p-2">
                <h3 class=" font-bold text-lg">我可以提供哪些幫助?</h3>
                <p class="text-base leading-[140%]">{{ state.user[UserAttributes.DESC_WHAT_CAN_I_HELP] }}</p>
              </div>
            </div>  
          </div>
        </template>
        <hr class="my-2">
        <div v-if="!isAuthenticated" class="">
          <p class="text-sm text-start">欲諮詢者，請先登入或註冊</p>

          <div class="flex flex-col items-center gap-2 mt-8">
            <router-link
              class="text-center content-center bg-gradient-to-r from-[#6FD7FD] to-[#47DE7899]/[0.6] hover:from-[#9FE4FE] hover:to-[#C6F5D5] border-none w-full h-[48px] rounded-[100px] text-black text-[20px] disabled:bg-[#E5E8EE] font-medium"
              :to="{ path: 'auth', query: { redirect: `/?mentor=${state.user?.sub}` } }"
            >
              立即登入
            </router-link>
          </div>
        </div>
        <div v-else class="card-body">
          <h1 class="card-title">向 {{ state.user?.name }} 預約</h1>
          <div v-if="state.errorMessage" class="alert alert-error" role="alert">
            {{ state.errorMessage }}
          </div>
          <BookingConfirmation :user-toggled="state.user" @submit="onSubmit" />
        </div>
      </label>
    </label>
    <!-- Profile modal -->

    <!-- Email sent modal -->
    <input id="email-sent-modal" type="checkbox" class="modal-toggle">
    <label class="modal" for="email-sent-modal">
      <label ref="formContainer" class="modal-box card w-full mx-auto shadow-xl flex flex-col" for="">
        <div class="card-body">
          <h1 class="card-title text-center block">信件已寄出!</h1>
          <div class="mt-4 flex justify-center">
            <button class="w-1/3 btn btn-primary" @click="closeEmailSentModal">
              關閉
            </button>
          </div>
        </div>
      </label>
    </label>
    <!-- Email sent modal -->
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { UserAttributes } from '../constants';
//import { userToCard } from '../helpers';
import BaseAvatar from './base/BaseAvatar.vue';
import HomeCardGrid from './HomeCardGrid.vue';
import BookingConfirmation from './BookingConfirmation.vue';
import BaseCountryWidget from './base/BaseCountryWidget.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();

const formContainer = ref(null);
const profileModalInput = ref(null);


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
  return store.state.isAuthenticated;
});

const state = reactive({
  user: undefined,
  errorMessage: '',
});


onMounted(() => {
  console.log('mounted');
  if (route.query.mentor) {
    fetchMentor(route.query.mentor);
  }
})

async function onSubmit(values) {
  state.errorMessage = '';

  const info = {
    body: {
      recipient_uuid: state.user.sub,
      message: `
      ${values.note}
      我有空的時間是: ${values.availableTime}
      `,
    },
  };

  try {
    // TODO: Replace with API to send booking email
    // await API.post('ServiceEndpoint', 'submit', info);
    // document.getElementById('booking-modal').checked = false;
    // document.getElementById('email-sent-modal').checked = true;
    console.log(info);
  } catch (err) {
    state.errorMessage = err;
  }
}

async function fetchMentor(uuid) {
  try {
    // TODO: Replace with API to query the user from firebase
    // const matches = await API.get('ServiceEndpoint', `user/${uuid}`);
    // state.user = userToCard(matches[0]);
    console.log(uuid);
    if (profileModalInput.value) {
      profileModalInput.value.checked = true;
    }
  } catch (err) {
    console.debug(err);
  }
}

const closeEmailSentModal = () => {
  document.getElementById('email-sent-modal').checked = false;
};

function modalChange(e) {
  if (e.target.checked) {
    router.replace({ query: { mentor: state.user.sub } });
  } else {
    state.user = undefined;
    router.replace({ query: { mentor: undefined } });
  }
}
</script>
