<template>
  <div>
    <div class="card w-96 mx-auto shadow-xl">
      <div class="card-body">
        <h1 class="card-title">Reset Password</h1>
        <template v-if="formState === 'resetPassword'">
          <base-input placeholder="Username" v-model="form.username"></base-input>
          <div class="card-actions justify-end">
            <div class="btn btn-primary mt-4" v-on:click="forgotPassword">
              Send verification code
            </div>
          </div>
        </template>
        <template v-if="formState === 'resetPasswordConfirm'">
          <base-input placeholder="Verification Code" v-model="form.authCode"></base-input>
          <base-input type="password" autocomplete="new-password" placeholder="New Password" v-model="form.password"></base-input>
          <div class="card-actions justify-end">
            <div class="btn btn-primary" v-on:click="forgotPasswordSubmit">
              Set new password
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from './base/BaseInput.vue'

const form = {
  username: '',
  password: '',
  authCode: ''
}

export default {
  components: {
    BaseInput,
  },
  props: ['toggleForm'],
  methods: {
    async forgotPassword() {
      try {
        await this.$Amplify.Auth.forgotPassword(this.form.username)
        this.formState = 'resetPasswordConfirm'
      } catch (err) {
        console.error(err)
      }
    },
    async forgotPasswordSubmit() {
      try {
        await this.$Amplify.Auth.forgotPasswordSubmit(this.form.username, this.form.authCode, this.form.password)
        this.form = form
        alert('Successfully reset password1')
        this.toggleForm('signIn')
      } catch (err) {
        console.error(err)
      }
    }
  },
  data() {
  return {
    formState: 'resetPassword',
    form
  }
}
}
</script>
