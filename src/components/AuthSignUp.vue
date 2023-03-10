<template>
  <div>
    <div
      v-if="errorMessage"
      class="alert alert-danger"
      role="alert"
    >
      {{ errorMessage }}
    </div>
    <div class="card w-96 mx-auto shadow-xl">
      <div class="card-body">
        <h1 class="card-title">
          註冊 Sign Up
        </h1>
        <template v-if="phase === Number(0)">
          <base-input
            v-model="form.attributes.email"
            placeholder="信箱 (Email)"
          />
          <base-input
            v-model="form.username"
            placeholder="用戶名稱 (Username)"
            autocomplete="username"
          />
          <base-input
            v-model="form.password"
            placeholder="密碼 (Password)"
            type="password"
            autocomplete="new-password"
          />
          <div class="card-actions justify-end">
            <ValidateBtn
              :form-array="[form.username, form.password, form.attributes.email]"
              @click="signUp"
              @update="isLoading = $event"
            >
              註冊 (Sign Up)
            </ValidateBtn>
          </div>
        </template>

        <template v-else-if="phase === Number(1)">
          <p>(請確認您的 Email 或是簡訊的 OTP 驗證碼)</p>
          <base-input
            v-model="authCode"
            placeholder="請輸入臨時性驗證碼 (Authentication code)"
          />

          <div class="text-xs">
            沒收到驗證碼？
            <a
              class="link"
              @click="resendConfirmationCode"
            >
              點我重新發送驗證碼 {{ `(${confirmationCodeCooldownSecond} 秒)` }}
            </a>
          </div>
          <div class="card-actions justify-end">
            <ValidateBtn
              :form-array="[form.username, form.password, form.attributes.email]"
              @click="confirmSignUp"
            >
              確認 (Confirm Sign Up)
            </ValidateBtn>
          </div>
        </template>
      </div>
    </div>
    <LoadingBar ref="loadingBar" />
  </div>
</template>

<script>
import i18n from '../mixin/i18n.js'
import BaseInput from './base/BaseInput.vue'
import LoadingBar from './base/BaseLoadingBar.vue'
import ValidateBtn from './base/BaseValidateBtn.vue'

export default {
  components: {
    BaseInput,
    LoadingBar,
    ValidateBtn
  },
  mixins: [i18n],
  emits: ["set-current-tab"],
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
      confirmationCodeCooldownSecond: 30,
    }
  },
  methods: {
    async signUp() {
      // need a validation before triggering loading bar
      this.$refs.loadingBar.doAjax(true); // activate loading bar when clicking
      try {
        await this.$Amplify.Auth.signUp(this.form)

        this.phase = 1
        this.confirmationCodeCooldownCountdown()

        this.$refs.loadingBar.doAjax(false); // disable loading bar no matter sign up successfully or not
        console.log('user successfully signed up!')
      } catch (err) {
        this.$refs.loadingBar.doAjax(false);
        console.error('error signing up...', err)
        this.errorMessage = this.geti18nAuthenticationErrorMessage(err.message)
      } finally{
        this.$refs.loadingBar.doAjax(false); // disable loading bar no matter sign up successfully or not
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
        console.error('error signing up...', err)
        this.errorMessage = err
      } finally{
        this.$refs.loadingBar.doAjax(false);
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
        console.error('error resending code: ', err);
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
  }
}
</script>
