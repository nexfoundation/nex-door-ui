<template>
  <div class="container my-20">
    <component :is="currentTab" @toSignIn="toSignIn" />
    <div class="tabs tabs-boxed w-96 mx-auto mt-8">
      <div v-for="tab in tabs" :key="tab" :class="['tab', { 'tab-active': currentTab === tab }]"
        @click="currentTab = tab">
        {{ tab }}
      </div>
    </div>
  </div>

</template>

<script>
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
import ForgotPassword from './ForgotPassword.vue'

export default {
  name: 'auth',
  components: {
    SignIn,
    SignUp,
    ForgotPassword,
  },
  data() {
    return {
      currentTab: 'SignIn',
      tabs: ['SignIn', 'SignUp', 'ForgotPassword'],
    }
  },

	methods: {
		toSignIn(val) {
			this.currentTab = val;
		}
	}
}
</script>
