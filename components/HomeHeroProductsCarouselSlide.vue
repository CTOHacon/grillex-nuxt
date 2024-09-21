<template>
	<div class="home-hero-products-carousel-slide">
		<h4 class="home-hero-products-carousel-slide__title" v-html="title" />
		<p class="home-hero-products-carousel-slide__price">
			{{ price }} {{ $t('uah') }}
		</p>
		<div class="home-hero-products-carousel-slide__image-container">
			<img
				v-if="image"
				:src="image?.url"
				:alt="htmlTagsDestroyer(title)"
				width="132"
				height="132"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';
const props = defineProps<{
	title: string;
	price: string | number;
	imageReference: string;
}>();

const mediaFilesStore = useMediaFilesStore();
const { mediaFile: image } = mediaFilesStore.useMediaFile(props.imageReference);
</script>

<style scoped lang="scss">
.home-hero-products-carousel-slide {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-direction: column;
	text-align: center;
	min-height: 13.9375rem;
	cursor: pointer;
}
.home-hero-products-carousel-slide__title {
	font-size: 1.125rem;
	font-weight: 800;
	line-height: 133%;
	max-width: 18.75rem;
	margin-bottom: 8px;
}
.home-hero-products-carousel-slide__price {
	font-size: 0.875rem;
	color: #d4d4d4;
	opacity: 0.4;
	font-weight: 500;
	margin-bottom: 0.5rem;
}
.home-hero-products-carousel-slide:hover
	.home-hero-products-carousel-slide__image-container {
	transform: scale(1.1);
}
.home-hero-products-carousel-slide__image-container {
	position: relative;
	width: 13.125rem;
	height: 8.25rem;
	overflow: hidden;
	transition: transform 0.3s ease;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
	}
}
</style>
