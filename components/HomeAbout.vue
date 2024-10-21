<template>
	<section class="home-about container">
		<div class="home-about__media-container">
			<img
				v-if="homeAboutImage"
				:src="homeAboutImage.url"
				:alt="htmlTagsDestroyer(title)"
				width="780"
				height="560"
				class="home-about__image"
				loading="lazy"
			/>
		</div>
		<div class="home-about__main">
			<h2 class="home-about__title" v-html="title" />
			<p class="home-about__text" v-html="text" />
			<LinkForwardButton
				class="home-about__details-button"
				v-if="link"
				:href="link"
			>
				{{ $t('details') }}
			</LinkForwardButton>
		</div>
	</section>
</template>

<script setup lang="ts">
import LinkForwardButton from './LinkForwardButton.vue';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';
import useWebPageStore from '~/store/useWebPageStore';
import useMediaFilesStore from '~/store/useMediaFilesStore';

const { getData } = useWebPageStore();
const title = getData('about.title');
const text = getData('about.text');
const link = getData('about.link');
const imageReference = getData('about.image');

const { mediaFile: homeAboutImage } =
	useMediaFilesStore().useMediaFile(imageReference);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-about {
	padding-top: 5.625rem;
	padding-bottom: 5.625rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	align-items: center;
	color: #fff;
	@media (max-width: $tablet-width) {
		grid-template-columns: 1fr;
		padding-top: 3.75rem;
		padding-bottom: 3.75rem;
	}
	@media (max-width: $mobile-width) {
		padding-top: 2.5rem;
		padding-bottom: 2.5rem;
	}
}
.home-about__media-container {
	border-radius: 0.0625rem;
	border: 0.25rem solid #212121;
	width: 100%;
	line-height: 0;
	height: 100%;
	position: relative;
	* {
		top: 0;
		left: 0;
		position: absolute;
		object-fit: cover;
		width: 100%;
		height: 100%;
		object-position: center;
	}
	@media (max-width: $tablet-width) {
		height: 40vh;
	}
}
.home-about__main {
	padding: 1.75rem 0 1.75rem var(--size-4);
	@media (max-width: $tablet-width) {
		padding: 0;
	}
}
.home-about__title {
	font-family: 'AA Duke';
	font-weight: 400;
	font-size: var(--size-6-5);
	line-height: 88%;
	text-transform: uppercase;
	margin-bottom: var(--size-2-5);
}
.home-about__text {
	opacity: 0.5;
	font-size: var(--size-1-125);
	line-height: 133%;
	font-weight: 300;
	padding-right: var(--size-4);
	@media (max-width: $tablet-width) {
		padding-right: 0;
	}
}
.home-about__details-button {
	margin-top: var(--size-2-5);
	@media (max-width: $tablet-width) {
		justify-content: center;
	}
}
</style>
