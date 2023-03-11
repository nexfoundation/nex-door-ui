<template>
  <button
    class="btn btn-primary"
    :disabled="disabled || isBtnDisabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
	props: {
		formArray: {
			type: Array[String],
			default: [],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		isBtnDisabled() {
			if (this.formArray) {
				let flag = this.formArray.includes('') || this.formArray.includes(undefined)
				return flag
			}
			return false
		},
	},
}
</script>
