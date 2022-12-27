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
        <button class='button' :disabled="isBtnDisabled" v-on:click="signUp" @update="isLoading = $event">
          <p>註冊 (Sign Up)</p>
        </button>
      </div>

      <div class='form' v-if="phase === Number(1)">
        <p>(請確認您的 Email 或是簡訊的 OTP 驗證碼)</p>
        <input
          class='input'
          v-model="authCode"
          placeholder='請輸入臨時性驗證碼 (Authentication code)'
        />
        <button class='button' v-on:click="confirmSignUp">
          <p>確認 (Confirm Sign Up)</p>
        </button>
        <div class='button' v-on:click="resendConfirmationCode">
          <p>重新發送驗證碼 (Resend Confirmation Code) {{ '(' + confirmationCodeCooldownSecond + ')' }}</p>
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
        this.$refs.loadingBar.doAjax(false); // disable loading bar no matter sign up successfully or not
        console.log('user successfully signed up!')
      } catch (err) {
        this.$refs.loadingBar.doAjax(false);
        console.log('error signing up...', err)
        this.errorMessage = err
      }
    },
    async confirmSignUp() {
      this.$refs.loadingBar.doAjax(true);
      try {
        await this.$Amplify.Auth.confirmSignUp(this.form.username, this.authCode)
        this.toggleForm('signIn')
        this.$refs.loadingBar.doAjax(false);
        console.log('user successfully signed up!')
      } catch (err) {
        this.$refs.loadingBar.doAjax(false);
        console.log('error signing up...', err)
        this.errorMessage = err
      }
    },
    toggleForm(val) {
      this.$emit("set-current-tab", val);
    },
    async resendConfirmationCode() {
      // Ignore the request if it is still in the resend confirmation code cooldown period
      if (this.confirmationCodeCooldownSecond > 0) {
        return
      }

      this.confirmationCodeCooldownSecond = 90
      this.confirmationCodeCooldownCountdown()
      try {
        await this.$Amplify.Auth.resendSignUp(this.form.username);
        console.log('code resent successfully');
      } catch (err) {
        console.log('error resending code: ', err);
      }
    },
    confirmationCodeCooldownCountdown() {
      if (this.confirmationCodeCooldownSecond > 0) {
        setTimeout(() => {
          this.confirmationCodeCooldownSecond -= 1
            this.confirmationCodeCooldownCountdown()
        }, 1000)
      }
    }
  },
  computed: {
	isBtnDisabled() {
		return (
			!this.form.username ||
			!this.form.password ||
			!this.form.attributes.email
		);
	},
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
      errorMessage: undefined,
      confirmationCodeCooldownSecond: 30 
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
