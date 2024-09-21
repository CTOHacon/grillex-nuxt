<template>
	<a
		:href="link"
		class="home-categories-card"
		:class="{
			_wide: brands?.length
		}"
	>
		<article class="home-categories-card__inner">
			<h4 class="home-categories-card__title" v-html="title" />
			<p class="home-categories-card__description" v-html="description" />
			<div class="home-categories-card__images-wrapper">
				<div class="home-categories-card__brands" v-if="brandLogos">
					<template v-for="logo in brandLogos">
						<img
							v-if="logo"
							:src="logo?.url"
							:alt="logo?.title"
							width="100"
							height="100"
							class="home-categories-card__brand-logo"
							loading="lazy"
						/>
					</template>
				</div>
				<div class="home-categories-card__image-container">
					<img
						v-if="image"
						:src="image.url"
						:alt="htmlTagsDestroyer(title)"
						width="364"
						height="278"
						loding="lazy"
					/>
				</div>
			</div></article
	></a>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';

const props = defineProps<{
	title: string;
	description: string;
	image: string;
	brands?: string[];
	link?: string;
}>();

const mediaFilesStore = useMediaFilesStore();
const brandLogos = props.brands
	? props.brands?.map(logo => {
			const { mediaFile } = mediaFilesStore.useMediaFile(logo);
			return mediaFile.value;
	  })
	: [];
const { mediaFile: image } = mediaFilesStore.useMediaFile(props.image);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-categories-card {
	display: block;
}
.home-categories-card__inner {
	border: 0.5rem solid #212121;
	padding: 2rem;
	color: #80868e;
	transition: color 0.2s ease-in-out;
	position: relative;
	display: flex;
	flex-direction: column;
	cursor: pointer;
	height: 100%;
	&:hover {
		color: #fff;
	}
}
.home-categories-card__title {
	font-family: AA Duke;
	font-size: var(--size-3);
	margin-bottom: 0.75rem;
	line-height: 88%;
	font-weight: 400;
	a {
		text-decoration: none;
	}
}
.home-categories-card__description {
	margin-bottom: 1rem;
	max-width: 36.5rem;
}
.home-categories-card__images-wrapper {
	display: flex;
	margin-top: auto;
	flex-wrap: wrap;
}

.home-categories-card__image-container {
	margin: auto -2rem -2rem -2rem;
	width: calc(100% + 4rem);
	height: 17.375rem;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		max-width: unset;
		object-fit: contain;
		object-position: bottom center;
	}
	@media (max-width: $mobile-width) {
		height: fit-content;
	}
}

.home-categories-card._wide .home-categories-card__image-container {
	margin-left: auto;
	width: 70%;
	@media (max-width: $tablet-width) {
		width: calc(100% + 4rem);
		margin-left: -2rem;
	}
}
.home-categories-card__brands {
	width: 30%;
	@media (max-width: $tablet-width) {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
}

.home-categories-card__brand-logo {
	position: relative;
	filter: invert(1);
	opacity: 0.5;
	height: auto;
}
</style>
