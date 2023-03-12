<template>
  <div>
    <div class="card w-96 mx-auto shadow-xl">
      <div class="card-body">
        <h1 class="card-title">
          註冊 Sign Up
        </h1>
        <AuthSignUpFormCredential
          v-if="phase === AuthSignUpPhases.CREDENTIAL"
          :error-message="errorMessage"
          @submit="signUp"
        />
        <AuthSignUpFormConfirmation
          v-if="phase === AuthSignUpPhases.CONFIRMATION"
          :error-message="errorMessage"
          @submit="confirmSignUp"
          @resend-confirmation-code="resendConfirmationCode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
import i18n from '../mixin/i18n'
import LoadingBar from './base/BaseLoadingBar'
import AuthSignUpFormCredential from './AuthSignUpFormCredential'
import AuthSignUpFormConfirmation from './AuthSignUpFormConfirmation'

const AuthSignUpPhases = Object.freeze({
  CREDENTIAL: 'credntial',
  CONFIRMATION: 'confirmation',
});

export default {
  components: {
    LoadingBar,
    AuthSignUpFormCredential,
    AuthSignUpFormConfirmation,
  },
  mixins: [i18n],
  emits: ["set-current-tab"],
  data() {
    return {
      AuthSignUpPhases,
      phase: AuthSignUpPhases.CREDENTIAL,
      username: '',
      confirmationCodeCooldownSecond: 30,
      errorMessage: '',
    }
  },
  methods: {
    async signUp(form) {
      // need a validation before triggering loading bar
      // this.$refs.loadingBar.doAjax(true); // activate loading bar when clicking
      try {
        this.username = form.username
        await Auth.signUp(form)

        this.phase = AuthSignUpPhases.CONFIRMATION
        this.confirmationCodeCooldownCountdown()

        // this.$refs.loadingBar.doAjax(false); // disable loading bar no matter sign up successfully or not
        console.log('user successfully signed up!')
      } catch (err) {
        // this.$refs.loadingBar.doAjax(false);
        console.error('error signing up...', err)
        this.errorMessage = this.geti18nAuthenticationErrorMessage(err.message)
      } finally{
        // this.$refs.loadingBar.doAjax(false); // disable loading bar no matter sign up successfully or not
      }
    },
    async confirmSignUp(form) {
      // this.$refs.loadingBar.doAjax(true);
      try {
        await Auth.confirmSignUp(this.username, form.authCode)
        this.toggleForm('signIn')
        // this.$refs.loadingBar.doAjax(false);
        console.log('user successfully signed up!')
      } catch (err) {
        // this.$refs.loadingBar.doAjax(false);
        console.error('error signing up...', err)
        this.errorMessage = err
      } finally{
        // this.$refs.loadingBar.doAjax(false);
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
        await Auth.resendSignUp(this.form.username);
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
