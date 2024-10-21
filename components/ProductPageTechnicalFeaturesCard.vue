<template>
	<li class="product-page-technical-heatures-card">
		<div class="product-page-technical-heatures-card__image-wrapper">
			<img
				v-if="icon"
				:src="icon.url"
				:alt="htmlTagsDestroyer(title)"
				width="100"
				height="100"
				loading="lazy"
			/>
		</div>
		<div class="product-page-technical-heatures-card__main">
			<h5
				class="product-page-technical-heatures-card__title"
				v-html="title"
			/>
			<p
				class="product-page-technical-heatures-card__text"
				v-html="description"
			/>
		</div>
	</li>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';

const props = defineProps<{
	icon: string;
	title: string;
	description: string;
}>();

const { useMediaFile } = useMediaFilesStore();
const { mediaFile: icon } = useMediaFile(props.icon);
</script>

<style scoped lang="scss">
.product-page-technical-heatures-card {
	display: flex;
	align-items: center;
	background: #f9f9f9;
	min-height: 100px;
	height: 100%;
}
.product-page-technical-heatures-card__image-wrapper {
	height: 100%;
	overflow: hidden;
	background: #fff;
	flex: 0 0 100px;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
.product-page-technical-heatures-card__main {
	padding: 1rem;
	padding-right: var(--size-2);
}

.product-page-technical-heatures-card__title {
	font-family: 'AA Duke';
	font-weight: 400;
	font-size: var(--size-1-75);
	line-height: 88%;
	letter-spacing: -0.02em;
	text-transform: uppercase;
	margin-bottom: 0.5rem;
}
.product-page-technical-heatures-card__text {
	font-size: 0.875rem;
}
</style>
