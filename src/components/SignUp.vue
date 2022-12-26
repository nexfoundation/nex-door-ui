<template>
  <div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <div class='form-container'>
      <h1 class='heading'>註冊 Sign Up</h1>
      <div class='form' v-if="phase === Number(0)">
        <input
          class='input'
          v-model="form.attributes.email"
          placeholder='信箱 (Email)'
        />
        <input
          class='input'
          v-model="form.username"
          placeholder='用戶名稱 (Username)'
        />
        <input
          class='input'
          v-model="form.password"
          placeholder='密碼 (Password)'
          type='password'
        />
        <!--input
          class='input'
          v-model="form.attributes.phone_number"
          placeholder='Phone'
        /-->
        <div class='button' v-on:click="signUp" @update="isLoading = $event">
          <p>註冊 (Sign Up)</p>
        </div>
      </div>

      <div class='form' v-if="phase === Number(1)">
        <p>(請確認您的 Email 或是簡訊的 OTP 驗證碼)</p>
        <input
          class='input'
          v-model="authCode"
          placeholder='請輸入臨時性驗證碼 (Authentication code)'
        />
        <div class='button' v-on:click="confirmSignUp">
          <p>確認 (Confirm Sign Up)</p>
        </div>
      </div>
    </div>
    <LoadingBar ref="loadingBar"/>
  </div>
</template>

<script>
import LoadingBar from './LoadingBar.vue'

export default {
//   props: ['toggleForm'],
  name: 'sign-up',
  components: {
    LoadingBar
  },
  methods: {
    async signUp() {
      // need a validation before triggering loading bar
      this.$refs.loadingBar.doAjax(true); // activate loading bar when clicking
      try {
        await this.$Amplify.Auth.signUp(this.form)
        this.phase = 1
        console.log('user successfully signed up!')
      } catch (err) {
        console.log('error signing up...', err)
        this.errorMessage = err
      } finally{
        this.$refs.loadingBar.doAjax(false); // disable loading bar no matter sign up successfully or not
      }
    },
    async confirmSignUp() {
      this.$refs.loadingBar.doAjax(true);
      try {
        await this.$Amplify.Auth.confirmSignUp(this.form.username, this.authCode)
        this.toggleForm('signIn')
        console.log('user successfully signed up!')
      } catch (err) {
        console.log('error signing up...', err)
        this.errorMessage = err
      } finally{
        this.$refs.loadingBar.doAjax(false);
      }
    },
	toggleForm(val) {
		this.$emit("set-current-tab", val);
	}
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        attributes: {
          email: '',
          phone_number: '',
        }
      },
      authCode: '',
      phase: 0,
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
  width: 262px;;
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
  align-self: flex-start;
}
.button:hover {
  opacity: .9;
}
.button p {
  margin: 0;
  color: white;
  font-weight: 600;
}
</style>
