<template>
  <div class='auth'>
    <component :is="currentTab" class="tab" @toSignIn="toSignIn">
    </component>

    <!-- TODO: stylee classes, replace btn to div -->
    <button v-for="tab in tabs" :key="tab" :class="['link-container', { active: currentTab === tab }, 'secondary',]" 
      @click="currentTab = tab">
      {{ tab }}
    </button>
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

<style scoped>
.active {
  display: none;
}

.link-container {
  /* TODO: invalid */
  margin-bottom: 5px;
  cursor: pointer;
}

.auth {
  display: flex;
  flex-direction: column;
}

.toggleButton {
  cursor: pointer;
  margin-bottom: 0;
}

.toggleButton:hover {
  opacity: .7;
}
</style>
