<template>
  <div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    <p>Loading ... </p>
	<LoadingBar ref="loadingBar" />
  </div>
</template>

<script>
import LoadingBar from './LoadingBar.vue'
import i18n from '../mixin/i18n.js'
import Hub from 'aws-amplify';

export default {
  name: 'sign-in',
  components: {
    LoadingBar
  },
  mixins: [i18n],
  mounted() {
    this.$refs.loadingBar.doAjax(true);
    // This is just an empty page to have loading progress,
    // the actual login event needs to be captured by Hub listenr.
    // Handler can be found in the App.vue file
    // Reference: https://github.com/aws-amplify/amplify-js/issues/5133#issuecomment-600759135
  },
  data() {
    return {
      errorMessage: undefined
    }
  }
}
</script>
