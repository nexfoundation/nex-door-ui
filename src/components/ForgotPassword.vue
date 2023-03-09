<template>
  <div>
    <div class="card w-96 mx-auto shadow-xl">
      <div class="card-body">
        <h1 class="card-title">Reset Password</h1>
        <template v-if="formState === 'resetPassword'">
          <input
            class="input w-full max-w-xs"
            placeholder="Username"
            v-model="form.username"
          />
          <div class="card-actions justify-end">
            <div class="btn btn-primary mt-4" v-on:click="forgotPassword">
              Send verification code
            </div>
          </div>
        </template>
        <template v-if="formState === 'resetPasswordConfirm'">
          <input
            class="input w-full max-w-xs"
            placeholder="Verification Code"
            v-model="form.authCode"
          />
          <input
            class="input w-full max-w-xs"
            type="password"
            placeholder="New Password"
            v-model="form.password"
          />
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
const form = {
  username: '',
  password: '',
  authCode: ''
}

export default {
  name: 'forgot-password',
  props: ['toggleForm'],
  methods: {
    async forgotPassword() {
      try {
        await this.$Amplify.Auth.forgotPassword(this.form.username)
        this.formState = 'resetPasswordConfirm'
      } catch (err) {
        console.log('error: ', err)
      }
    },
    async forgotPasswordSubmit() {
      try {
        await this.$Amplify.Auth.forgotPasswordSubmit(this.form.username, this.form.authCode, this.form.password)
        this.form = form
        alert('Successfully reset password1')
        this.toggleForm('signIn')
      } catch (err) {
        console.log('error: ', err)
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
