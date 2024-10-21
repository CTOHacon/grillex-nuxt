<template>
	<div class="images-gallery-row-block">
		<ImagesGalleryRowBlockItem
			v-for="image in props.images"
			:key="image"
			:image-reference="image"
		/>
	</div>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import ImagesGalleryRowBlockItem from './ImagesGalleryRowBlockItem.vue';

const props = defineProps<{ images: string[] }>();
</script>

<style scoped lang="scss">
.images-gallery-row-block {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}
</style>
