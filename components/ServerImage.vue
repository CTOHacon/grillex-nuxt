<template>
	<NuxtImg
		v-if="mediaFile"
		:src="getSizeUrl(size ?? 'full')"
		:alt="alt || mediaFile.title"
		:loading="eager ? 'eager' : 'lazy'"
		:srcset="srcsetAttribute"
		:sizes="sizesAttribute"
		:width="mediaFile.sizes?.full.width"
		:height="mediaFile.sizes?.full.height"
	/>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import type { TMediaFileSizeKey } from '~/types/TMediaFile';

const props = defineProps<{
	reference: string | number | undefined;
	eager?: boolean;
	alt: string;
	size?: TMediaFileSizeKey;
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
