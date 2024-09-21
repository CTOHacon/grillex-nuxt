<template>
	<a :href="url" class="catalog-modal-brand" :title="title">
		<img
			class="catalog-modal-brand__image"
			loading="lazy"
			:src="logo.url"
			:width="logo.sizes?.full.width"
			:height="logo.sizes?.full.height"
			:alt="title"
			v-if="logo"
		/>
		<span v-else>{{ title }}</span>
	</a>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import type { TMediaFile } from '~/types/TMediaFile';

const props = defineProps<{
	logo: string;
	title: string;
	url: string;
}>();

const mediaFilesStore = useMediaFilesStore();
const { mediaFile: logo, updateReference } = mediaFilesStore.useMediaFile(
	props.logo
);
</script>

<style scoped lang="scss">
.catalog-modal-brand {
	display: block;
	height: 100%;
	&__image {
		display: block;
		height: 100%;
		width: auto;
		opacity: 0.5;
		transition: opacity 0.2s ease-in-out;
		&:hover {
			opacity: 1;
		}
	}
}
</style>
