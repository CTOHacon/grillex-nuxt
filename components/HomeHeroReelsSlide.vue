<template>
	<a :href="link" class="home-hero-reels-slide">
		<div class="home-hero-reels-slide__image-container">
			<img
				v-if="image"
				:src="image?.url"
				width="800"
				height="600"
				:alt="htmlTagsDestroyer(title)"
			/>
		</div>
		<div class="home-hero-reels-slide__content">
			<h4 class="home-hero-reels-slide__title">
				<span v-for="(title, index) in splittedTitle" :key="index">
					{{ title }}
				</span>
			</h4>
			<LinkForwardButton class="home-hero-reels-slide__link">
				{{ $t('details') }}
			</LinkForwardButton>
		</div>
	</a>
</template>

<script setup lang="ts">
import LinkForwardButton from './LinkForwardButton.vue';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';
import { computed } from 'vue';
import useMediaFilesStore from '~/store/useMediaFilesStore';

const props = defineProps<{
	imageReference: string;
	title: string;
	link: string;
}>();
const splittedTitle = computed(() => props.title.split('<br>'));

const mediaFilesStore = useMediaFilesStore();
const { mediaFile: image } = mediaFilesStore.useMediaFile(props.imageReference);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-hero-reels-slide {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	cursor: pointer;
	@media (max-width: $tablet-width) {
		min-height: 50vh;
	}
}
.home-hero-reels-slide__image-container {
	height: 100%;
	width: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 0;
	background: #212121;
	img {
		// opacity: 0.5;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.2s ease;
	}
}
.home-hero-reels-slide:hover .home-hero-reels-slide__image-container img {
	transform: scale(1.1);
}

.home-hero-reels-slide__content {
	position: relative;
	z-index: 1;
	padding: 1.5rem;
}
.home-hero-reels-slide__title {
	font-family: 'AA Duke';
	font-weight: 400;
	font-size: var(--size-3);
	line-height: 88%;
	text-align: center;
	letter-spacing: -0.02em;
	text-transform: uppercase;

	span {
		display: block;
		width: fit-content;
		margin-left: auto;
		margin-right: auto;
		border-radius: 0.125rem;
		background: #fff;
		padding: 0.375rem 0.375rem 0 0.375rem;
		&:not(:last-child) {
			margin-bottom: 0.25rem;
		}
	}
}
.home-hero-reels-slide__link {
	width: fit-content;
	color: #fff;
	padding: var(--size-1-5);
	margin-left: auto;
	margin-right: auto;
	&:hover {
		color: #e4121f;
	}
}
.home-hero-reels-slide:hover .home-hero-reels-slide__link {
	color: #e4121f;
}
</style>
