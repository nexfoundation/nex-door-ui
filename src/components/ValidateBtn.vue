<template>
	<button class='btn btn-primary' :disabled='disabled || isBtnDisabled'>
		<slot></slot>
	</button>
</template>

<script>
export default {
	props: ['formArray', 'disabled'],
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
