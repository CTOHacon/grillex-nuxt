<template>
	<article class="base-featured-article-large-card" :class="`${theme}-theme`">
		<img
			class="base-featured-article-large-card__image"
			v-if="image"
			:src="image"
			:alt="htmlTagsDestroyer(title)"
			width="469"
			height="469"
			loading="lazy"
		/>
		<SectionTitle
			tagname="h2"
			class="base-featured-article-large-card__title base-featured-article-large-card__width-wrapper"
		>
			{{ title }}
		</SectionTitle>
		<p
			class="base-featured-article-large-card__text base-featured-article-large-card__width-wrapper"
			v-html="text"
		/>
		<LinkForwardButton
			class="base-featured-article-large-card__link"
			:href="link"
		>
			{{ $t('details') }}
		</LinkForwardButton>
	</article>
</template>

<script setup lang="ts">
import LinkForwardButton from './LinkForwardButton.vue';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';

defineProps<{
	title: string;
	text: string;
	image: string;
	link: string;
	theme: 'light' | 'dark';
}>();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';

.base-featured-article-large-card {
	padding: 6.5rem 2rem 6.5rem 5rem;
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	&.light-theme {
		background: #f0f0f0;
		color: #101011;
	}
	&.dark-theme {
		background: #101011;
		color: #f9f9f9;
	}
	@media (max-width: $tablet-width) {
		padding: 1.5rem;
	}
	@media (max-width: $mobile-width) {
		padding: 2rem 1rem;
	}
}
.base-featured-article-large-card__width-wrapper {
	max-width: 33.0625rem;
	position: relative;
}
.base-featured-article-large-card__title {
	margin-bottom: 2rem;
	font-size: 5.5rem;
	@media (max-width: $tablet-width) {
		font-size: 3.5rem;
	}
}
.base-featured-article-large-card__text {
	font-size: 1.125rem;
	line-height: 1.33;
	@media (max-width: $mobile-width) {
		font-size: 1rem;
	}
}

.base-featured-article-large-card__image {
	position: absolute;
	bottom: 0;
	right: 0;
	max-width: min(29.3125rem, calc(100% - 37.5rem));
	height: auto;
	z-index: 0;
	// @media (max-width: $tablet-width) {
	// 	display: none;
	// }
}
.base-featured-article-large-card__link {
	position: absolute;
	top: 1rem;
	right: 1rem;
	@media (max-width: $mobile-width) {
		justify-content: center;
		position: relative;
		margin-top: auto;
		right: unset;
	}
}
</style>
