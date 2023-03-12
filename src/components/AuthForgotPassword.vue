<template>
  <div>
    <div class="card w-96 mx-auto shadow-xl">
      <div class="card-body">
        <h1 class="card-title">
          Reset Password
        </h1>
        <template v-if="formState === 'resetPassword'">
          <BaseInput
            v-model="form.username"
            placeholder="Username"
          />
          <div class="card-actions justify-end">
            <div
              class="btn btn-primary mt-4"
              @click="forgotPassword"
            >
              Send verification code
            </div>
          </div>
        </template>
        <template v-if="formState === 'resetPasswordConfirm'">
          <BaseInput
            v-model="form.authCode"
            placeholder="Verification Code"
          />
          <BaseInput
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            placeholder="New Password"
          />
          <div class="card-actions justify-end">
            <div
              class="btn btn-primary"
              @click="forgotPasswordSubmit"
            >
              Set new password
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify';
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
  props: {
    toggleForm: {
      type: Function,
      default: () => {},
    },
  },
  data() {
  return {
    formState: 'resetPassword',
    form
  }
},
  methods: {
    async forgotPassword() {
      try {
        await Auth.forgotPassword(this.form.username)
        this.formState = 'resetPasswordConfirm'
      } catch (err) {
        console.error(err)
      }
    },
    async forgotPasswordSubmit() {
      try {
        await Auth.forgotPasswordSubmit(this.form.username, this.form.authCode, this.form.password)
        this.form = form
        alert('Successfully reset password1')
        this.toggleForm('signIn')
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
