<template>
	<a v-if="str.includes('http')" :href="retrieveUrl(str)">{{str}}</a>
	<p v-else-if="str">{{str}}</p>
	<br v-else />
</template>

<script>
export default {
	name: 'intro-text',
	props: ['str'],
	methods: {
		retrieveUrl(str) {
			if (str.length === str.substring(str.indexOf('http'))) {
				return str
			}
			const url = str.substring(str.indexOf('http')).split(" ")[0]
			return url
		}
	}
}
</script>

<style>
pre.intro p {
		text-align: left;
		margin: 0;
	}

	pre.intro a {
		display: block;
		text-align: left;
	}
</style>