<template>
	<component
		:is="link ? 'a' : 'div'"
		class="home-featured-articles-medium-card"
		:href="link"
	>
		<article
			class="home-featured-articles-medium-card__inner"
			:style="{
				backgroundImage: `url(${backgroundImageUrl || ''})`
			}"
		>
			<h4
				class="home-featured-articles-medium-card__title mb-1 pt-3 pl-3 pr-3"
				v-html="title"
			></h4>
			<p
				class="home-featured-articles-medium-card__text pl-3 pr-3 pb-3"
				v-html="text"
			/>
			<img
				v-if="imageUrl"
				class="home-featured-articles-medium-card__image"
				:src="imageUrl"
				:alt="htmlTagsDestroyer(title)"
				width="423"
				height="265"
				loading="lazy"
			/>
		</article>
	</component>
</template>

<script setup lang="ts">
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';

defineProps<{
	backgroundImageUrl: string;
	imageUrl: string;
	title: string;
	text: string;
	link: string;
}>();
</script>

<style scoped lang="scss">
.home-featured-articles-medium-card {
	text-align: center;
	position: relative;
	color: #fff;
	overflow: hidden;
	cursor: pointer;
	display: block;
	text-decoration: none;
}
.home-featured-articles-medium-card__inner {
	display: flex;
	flex-direction: column;
	background-size: cover;
	background-position: center center;
	height: 100%;
	padding-top: var(--size-3);
}
.home-featured-articles-medium-card__title {
	font-size: 1.5rem;
	font-weight: 800;
}
.home-featured-articles-medium-card__text {
	font-size: 1.125rem;
}
.home-featured-articles-medium-card__image {
	margin-top: auto;
	width: 100%;
	height: auto;
	bottom: 0;
	left: 0;
	transition: transform 0.2s ease-in-out;
	transform-origin: bottom;
	z-index: 0;
}
.home-featured-articles-medium-card:hover
	.home-featured-articles-medium-card__image {
	transform: scale(1.05);
}
</style>
