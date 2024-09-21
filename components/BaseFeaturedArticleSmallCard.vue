<template>
	<article class="base-featured-article-small-card">
		<img
			v-if="image"
			class="base-featured-article-small-card__image"
			loading="lazy"
			width="134"
			height="134"
			:src="image"
			:alt="htmlTagsDestroyer(title)"
		/>
		<h3
			class="base-featured-article-small-card__title fs-1-5 mb-8 fw-800 mb-1 lh-100"
		>
			<a class="reset-link" :href="link" v-html="title" />
		</h3>
		<p
			class="base-featured-article-small-card__text color-semi-gray fw-600 lh-100"
		>
			{{ text }}
		</p>
		<SvgIcon
			:name="'link-decoration'"
			class="base-featured-article-small-card__link-icon"
		/>
	</article>
</template>

<script setup lang="ts">
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';
import SvgIcon from './SvgIcon.vue';

defineProps<{
	title: string;
	text: string;
	image: string;
	link: string;
}>();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.base-featured-article-small-card {
	position: relative;
	z-index: 1;
	border-radius: 0.125rem;
	border: 0.25rem solid #e4121f;
	background: #570711;
	padding: 1.5rem 0.25rem 1.5rem 2rem;
	color: #fff;
	cursor: pointer;
	overflow: hidden;
	&::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		z-index: 0;
		height: 100%;
		width: 5.0625rem;
		opacity: 0.3;
		background: #e4121f;
		z-index: -1;
		transition: transform 0.2s ease-in-out;
		transform: translateX(50%);
	}
	&:hover::before {
		transform: translateX(0);
	}
	@media (max-width: $mobile-width) {
		padding: 1rem 0.25rem 1rem 1rem;
	}
}
.base-featured-article-small-card__title {
	max-width: calc(100% - 2.5rem);
}
.base-featured-article-small-card__text {
	max-width: 16.25rem;
}
.base-featured-article-small-card__image {
	position: absolute;
	bottom: 0;
	right: 0;
	max-height: 100%;

	transform-origin: bottom;
	z-index: -1;
	width: auto;
	@media (max-width: $mobile-width) {
		filter: blur(0.25rem);
		opacity: 0.5;
	}
}

.base-featured-article-small-card__link-icon {
	position: absolute;
	top: 2rem;
	right: 1.75rem;
	width: 1.25rem;
	height: 1.25rem;
	color: #fff;
	z-index: 2;
	transition: transform 0.2s ease-in-out;
}
.base-featured-article-small-card:hover
	.base-featured-article-small-card__link-icon {
	transform: scale(1.2);
}
</style>
