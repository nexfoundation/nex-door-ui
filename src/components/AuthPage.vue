<template>
  <div class="container my-20">
    <component
      :is="currentTab"
      @to-sign-in="toSignIn"
    />
    <div class="tabs tabs-boxed w-96 mx-auto mt-8">
      <div
        v-for="tab in tabs"
        :key="tab"
        :class="['tab', { 'tab-active': currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </div>
    </div>
  </div>
</template>

<script>
import AuthSignIn from './AuthSignIn.vue'
import AuthSignUp from './AuthSignUp.vue'
import AuthForgotPassword from './AuthForgotPassword.vue'

export default {
  name: 'AuthPage',
  components: {
    AuthSignIn,
    AuthSignUp,
    AuthForgotPassword,
  },
  data() {
    return {
      currentTab: 'AuthSignUp',
      tabs: ['AuthSignIn', 'AuthSignUp', 'AuthForgotPassword'],
    }
  },

	methods: {
		toSignIn(val) {
			this.currentTab = val;
		}
	}
}
</script>
