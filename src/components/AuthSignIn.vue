<template>
  <div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <div class="card w-96 mx-auto shadow-xl">
      <div class="card-body">
        <h1 class="card-title">登入 Sign In</h1>
        <input
          class="input w-full max-w-xs"
          placeholder='用戶名稱 (Username / Email)'
          v-model="form.username"
        />
        <input
          class="input w-full max-w-xs"
          placeholder='密碼 (Password)'
          v-model="form.password"
          type='password'
        />
        <div class="card-actions justify-end">
          <ValidateBtn
            :formArray="[form.username, form.password]"
            @click.native="signIn"
          >登入 (Sign In)</ValidateBtn>
        </div>
      </div>
    </div>
    <LoadingBar ref="loadingBar" />
  </div>
</template>

<script>
import i18n from '../mixin/i18n.js'
import LoadingBar from './base/BaseLoadingBar.vue'
import ValidateBtn from './base/BaseValidateBtn.vue'

export default {
  components: {
	LoadingBar,
	ValidateBtn
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
        console.error(err)
        console.log('error: ', err)
        this.errorMessage = this.geti18nAuthenticationErrorMessage(err.message)
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

