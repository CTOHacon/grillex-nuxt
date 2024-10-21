<template>
	<div v-if="mediaFile" class="images-gallery-row-block-item">
		<img
			:src="mediaFile.url"
			:alt="mediaFile.title"
			:width="mediaFile.sizes?.full.width"
			:height="mediaFile.sizes?.full.height"
			loading="lazy"
		/>
	</div>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';

const props = defineProps<{
	imageReference: string;
}>();

const mediaFilesStore = useMediaFilesStore();

const { mediaFile } = mediaFilesStore.useMediaFile(props.imageReference);
</script>

<style scoped lang="scss">
.images-gallery-row-block-item {
	flex: 1;
	overflow: hidden;
	max-height: 40.75rem;
	min-width: 300px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
}
</style>
