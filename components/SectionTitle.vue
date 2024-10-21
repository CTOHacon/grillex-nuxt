<template>
	<component
		class="section-title"
		:is="tagname"
		:class="class"
		:style="`font-size: var(${sizeVar})`"
	>
		<slot />
	</component>
</template>

<script lang="ts" setup>
const props = defineProps<{
	tagname: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
	size: string;
	class?: string;
}>();
const { tagname } = toRefs(props);
if (!tagname.value) tagname.value = 'h2';

const sizeVar = computed(() => {
	return `--size-${props.size}`;
});
</script>

<style lang="scss">
.section-title {
	font-weight: 400;
	line-height: 88%;
	text-transform: uppercase;
	font-family: 'AA Duke', sans-serif;
}
</style>
