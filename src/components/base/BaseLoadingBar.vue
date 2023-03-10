<template>
  <div class="vld-parent">
    <loading
      v-model:active="isLoading"
      :is-full-page="true"
    />
  </div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	components: {
		Loading
	},
	data() {
		return {
			isLoading: false,
		}
	},
	methods: {
		doAjax(bool) {
			this.isLoading = bool;
		}
	}
}
</script>