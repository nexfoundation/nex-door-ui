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
			// when it's http://www.abc.com, return it directly
			if (str.length === str.substring(str.indexOf('http')).length) {
				return str
			}
			// extract only http://www.abc.com if original str is "abc http://www.abc.com abc"
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