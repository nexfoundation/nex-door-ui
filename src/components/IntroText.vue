<template>
	<a v-if="str.includes('http')" :href="str">{{str}}</a>
	<p v-else-if="str">{{str}}</p>
	<br v-else />
</template>

<script>
export default {
	name: 'intro-text',
	props: ['str']
}
</script>

<style>
	pre.intro p {
		text-align: left;
		margin: 0;
	}
</style>