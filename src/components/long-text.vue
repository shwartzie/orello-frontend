<template lang="">
	<p>
		{{formattedText}}<span v-if="!isMore && longText">...</span> 
	<span  v-if="longText" @click="isMore=!isMore"></span>
	</p>
</template>
<script>
export default {
	props: { text: String },
	data() {
		return {
			isMore: false,
			longText: this.text.length > 40,
		}
	},
	methods: {},
	computed: {
		formattedText() {
			return this.isMore ? this.text : this.text.slice(0, 40)
		},
	},
}
</script>



