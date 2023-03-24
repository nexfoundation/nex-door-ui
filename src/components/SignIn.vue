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
          <p>登入 (Sign In)</p>
        </button>

        <button class='button' v-on:click="googleIDPLogin">
            <p><span class="MuiButton-startIcon MuiButton-iconSizeLarge"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg></span> 使用 Google 登入 (Google Sign In)</p>
        </button>
      </div>
    </div>
	<LoadingBar ref="loadingBar" />
  </div>
</template>

<script>
import LoadingBar from './LoadingBar.vue'
import i18n from '../mixin/i18n.js'

export default {
  name: 'sign-in',
  components: {
    LoadingBar
  },
  mixins: [i18n],
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
        this.errorMessage = this.geti18nAuthenticationErrorMessage(err.message)
      }
    },
    async googleIDPLogin() {
      this.$Amplify.Auth.federatedSignIn({provider: 'Google'})
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

<style scoped>
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
</style>
