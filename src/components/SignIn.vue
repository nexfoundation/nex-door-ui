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
		<ValidateBtn 
			:formArray="[form.username, form.password]" 
			:text="'登入 (Sign In)'" 
			:btnType="'sign-button'"
			v-on:click.native="signIn"
		/>
      </div>
    </div>
	<LoadingBar ref="loadingBar" />
  </div>
</template>

<script>
import LoadingBar from './LoadingBar.vue'
import ValidateBtn from './ValidateBtn.vue'

export default {
  name: 'sign-in',
  components: {
	LoadingBar,
	ValidateBtn
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
        this.errorMessage = err.message
      }
    }
  },
  data() {
	return {
		form: {
			username: '',
			password: '',
		},
		errorMessage: undefined,
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
</style>
