<template>
	<h1 class="section-title" v-if="tagname === 'h1'"><slot /></h1>
	<h2 class="section-title" v-else-if="tagname === 'h2'"><slot /></h2>
	<h3 class="section-title" v-else-if="tagname === 'h3'"><slot /></h3>
	<h4 class="section-title" v-else-if="tagname === 'h4'"><slot /></h4>
	<h5 class="section-title" v-else-if="tagname === 'h5'"><slot /></h5>
</template>

<script lang="ts" setup>
const props = defineProps<{
	tagname: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}>();
const { tagname } = toRefs(props);
if (!tagname.value) tagname.value = 'h2';
</script>

<style lang="scss">
.section-title {
	font-weight: 400;
	line-height: 88%;
	text-transform: uppercase;
	font-family: 'AA Duke', sans-serif;
	font-size: 3rem;
}
</style>
