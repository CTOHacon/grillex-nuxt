<template>
	<component
		:is="link ? 'a' : 'div'"
		class="home-promotion-area-featured-article"
		:href="link"
		v-if="title || text || image"
	>
		<article class="home-promotion-area-featured-article__inner">
			<h4
				class="home-promotion-area-featured-article__title"
				v-if="title"
				v-html="title"
			></h4>
			<p
				class="home-promotion-area-featured-article__text"
				v-if="text"
				v-html="text"
			></p>
			<LinkForwardButton
				class="home-promotion-area-featured-article__link"
			>
				{{ $t('details') }}
			</LinkForwardButton>
			<img
				class="home-promotion-area-featured-article__image"
				v-if="image"
				:src="image.url"
				:width="image.sizes?.full.width"
				:height="image.sizes?.full.height"
				loading="lazy"
				:alt="htmlTagsDestroyer(title)"
			/>
		</article>
	</component>
</template>

<script setup lang="ts">
import LinkForwardButton from '@/components/LinkForwardButton.vue';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import useWebPageStore from '~/store/useWebPageStore';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';

const { getData } = useWebPageStore();

const imageReference = getData('promotion_area.featured_article.image');
const { mediaFile: image } = useMediaFilesStore().useMediaFile(imageReference);
const title = getData('promotion_area.featured_article.title') || '';
const text = getData('promotion_area.featured_article.text') || '';
const link = getData('promotion_area.featured_article.link') || '';
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-promotion-area-featured-article {
	display: block;
	border-radius: 0.125rem;
	border: 0.0625rem solid #212121;
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	color: #fff;
	background: radial-gradient(
			61.19% 33.11% at 50% 66.89%,
			rgba(0, 0, 0, 0) 0%,
			#000 100%
		),
		#242424;
}
.home-promotion-area-featured-article__inner {
	padding-top: 3.625rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.home-promotion-area-featured-article__title {
	max-width: 70%;
	font-family: 'AA Duke';
	text-transform: uppercase;
	font-weight: 400;
	font-size: var(--size-3);
	line-height: 88%;
	margin-bottom: var(--size-1-5);
	@media (max-width: $tablet-width) {
		padding: 0.75rem 1.5rem;
	}
}

.home-promotion-area-featured-article__text {
	font-size: var(--size-1-125);
	max-width: 65%;
	color: #d5d5d5;
	opacity: 0.8;
}

.home-promotion-area-featured-article__link {
	padding: 1rem 0.375rem 1rem 1.5rem;
	width: fit-content;
	margin-top: 0.75rem;
	margin-left: auto;
	margin-right: auto;
}
.home-promotion-area-featured-article:hover
	.home-promotion-area-featured-article__link {
	color: #e4121f;
}
.home-promotion-area-featured-article__image {
	margin-left: auto;
	max-width: 100%;
	height: auto;
}
</style>
