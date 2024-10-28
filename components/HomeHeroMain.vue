<template>
	<div class="home-hero-main">
		<div class="home-hero-main__inner">
			<h1 class="home-hero-main__title" v-html="title" />
			<p class="fs-1-5 home-hero-main__text" v-html="text" />
			<ServerImage
				:reference="imageReference"
				:alt="htmlTagsDestroyer(title)"
				class="home-hero-main__image"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import useWebPageStore from '~/store/useWebPageStore';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';
import ServerImage from './ServerImage.vue';

const { getData } = useWebPageStore();
const title = getData('hero_main.title');
const text = getData('hero_main.text');
const imageReference = getData('hero_main.image');
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-hero-main {
	background: url(/public/images/hero-main-background.jpg) no-repeat center
		center;
	background-size: cover;
	overflow: hidden;
}
.home-hero-main__inner {
	min-height: 48.75rem;
	max-width: calc(
		100% / 0.7 - 30% / 0.7 - (100% / 0.7 - 98rem) / 2 - 1rem / 2
	);
	width: 100%;
	margin-left: auto;
	height: 100%;
	text-align: center;
	padding: var(--size-5);
	color: #fff;
	position: relative;
	border-radius: 0.0625rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (max-width: $tablet-width) {
		min-height: unset;
		flex-direction: column;
		display: flex;
		justify-content: flex-end;
		padding: 2rem 1.5rem 0 1.5rem;
	}
}
.home-hero-main__title {
	font-family: 'AA Duke';
	font-size: var(--size-5-5);
	line-height: 96%;
	text-transform: uppercase;
	color: #f9f9f9;
	font-weight: 300;
	margin-bottom: var(--size-1-5);
	:deep(strong) {
		display: block;
		color: #e4121f;
	}
}
.home-hero-main__text {
	max-width: 37.5625rem;
	font-weight: 300;
	font-size: var(--size-1-5);
	line-height: 133%;
	color: #d5d5d5;
}
.home-hero-main__image {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	height: min(60%, 28rem);
	max-width: unset;
	width: auto;
	@media (max-width: $tablet-width) {
		height: 40vh;
		position: relative;
		align-self: baseline;
	}
}
</style>
