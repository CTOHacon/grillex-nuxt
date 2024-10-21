<template>
	<component :is="component" v-bind="props.data" />
</template>

<script setup lang="ts">
const props = defineProps<{
	type: string;
	data: any;
}>();

const blocks = {
	HtmlBlock: import('~/components/Blocks/HtmlBlock.vue'),
	ImagesGalleryRowBlock: import(
		'~/components/Blocks/ImagesGalleryRowBlock.vue'
	),
	ProductsSliderBlock: import('~/components/Blocks/ProductsSliderBlock.vue')
};

// @ts-ignore
const component = defineAsyncComponent(() => blocks[props.type]);
</script>

<style scoped></style>
