<template>
  <div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <div class='form-container'>
      <h1 class='heading'>登入 Sign In</h1>
      <div class='form'>
        <input
          class='input'
          placeholder='用戶名稱 (Username / Email)'
          v-model="form.username"
        />
        <input
          class='input'
          placeholder='密碼 (Password)'
          v-model="form.password"
          type='password'
        />
        <button class='button' :disabled="isBtnDisabled" v-on:click="signIn">
        登入 (Sign In)
        </button>
      </div>
    </div>
	<LoadingBar ref="loadingBar" />
  </div>
</template>

<script>
import LoadingBar from './LoadingBar.vue'

export default {
  name: 'sign-in',
  components: {
    LoadingBar
  },
  methods: {
    async signIn() {
      if (this.form.username == '' || this.form.password == '') {
        this.errorMessage = '請填寫用戶名稱或密碼！'
        return
      }
      this.$refs.loadingBar.doAjax(true);
      try {
        const user = await this.$Amplify.Auth.signIn(this.form.username, this.form.password)
        this.$store.dispatch('setIsAuthenticated', true)
        this.$store.dispatch('setUser', user)
        this.$router.push('/')
        this.$refs.loadingBar.doAjax(false);
      } catch (err) {
        this.$refs.loadingBar.doAjax(false);
        console.log('error: ', err)
        this.errorMessage = err
      }
    }
  },
  computed: {
	isBtnDisabled() {
		return (
			!this.form.username ||
			!this.form.password
		);
	},
  },
  data() {
  return {
    form: {
      username: '',
      password: '',
    },
    errorMessage: undefined
  }
}
}
</script>

<!-- <style scoped>
.heading {
  text-align: left;
  margin: 55px 5px 15px;
}
.form-container {
  width: 262px;
  margin: 0 auto;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  padding: 13px 35px;
  background-color: #2c3e50;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
  margin: 25px 0px 20px;
  opacity: 1;
}

.button[disabled] {
	opacity: 0.5;
  cursor: default;
}
.button:not([disabled]):hover {
  opacity: 0.9;
}
.button p {
  margin: 0;
  color: white;
  font-weight: 600;
}
</style> -->
