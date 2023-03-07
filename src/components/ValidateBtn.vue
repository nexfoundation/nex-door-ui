<template>
	<button :class='btnType' :disabled='isBtnDisabled'>
		<p>{{ text }}</p>
	</button>
</template>

<script>
export default {
	props: ['formArray', 'text', 'btnType'],
	computed: {
		isBtnDisabled() {
			console.log(this.formArray)
			if (this.formArray) {
				let flag = this.formArray.includes('') || this.formArray.includes(undefined)
				return flag
			}
			return false
		},
	},
}
</script>

<style>
.sign-button {
	padding: 13px 35px;
	background-color: #2c3e50;
	cursor: pointer;
	box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
	margin: 25px 0px 20px;
	opacity: 1;
}

.update-button {
	padding: 10px 20px;
	background-color: #0f447a;
	cursor: pointer;
	box-shadow: 1px 1px 5px rgba(237, 235, 235, 0.5);
	margin: 25px 0px 20px;
	opacity: 1;
	border-radius: 10px;
}

button[disabled] {
	opacity: 0.5;
	cursor: default;
}

button:not([disabled]):hover {
	opacity: 0.9;
}

.sign-button p, .update-button p {
	margin: 0;
	color: white;
	font-weight: 600;
}
</style>