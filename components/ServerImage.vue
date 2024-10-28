<template>
	<img
		v-if="mediaFile"
		:src="getSizeUrl('full')"
		:alt="alt || mediaFile.title"
		:loading="eager ? 'eager' : 'lazy'"
		:srcset="srcsetAttribute"
		:sizes="sizesAttribute"
	/>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';

const props = defineProps<{
	reference: string | number | undefined;
	eager?: boolean;
	alt: string;
}>();

const mediaFilesStore = useMediaFilesStore();
const { mediaFile, getSizeUrl } = mediaFilesStore.useMediaFile(props.reference);

const sizes = mediaFile.value?.sizes;

const srcsetAttribute = computed(() => {
	if (!sizes) return '';
	if (Object.keys(sizes).length === 1) return '';

	return Object.entries(sizes)
		.map(([size, { url, width }]) => `${url} ${width}w`)
		.join(', ');
});

const sizesAttribute = computed(() => {
	if (!sizes) return '';
	if (Object.keys(sizes).length === 1) return '';

	return Object.entries(sizes)
		.map(([size, { width }]) => `(max-width: ${width}px) ${width}px`)
		.join(', ');
});
</script>

<style scoped></style>
