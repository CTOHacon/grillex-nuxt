<template>
	<component
		:is="link ? 'a' : 'span'"
		class="home-recomendations-small-card"
		:href="link"
	>
		<article class="home-recomendations-small-card__inner color-white">
			<img
				v-if="image"
				class="home-recomendations-small-card__image"
				:src="image?.url"
				:width="image?.sizes?.full.width"
				:height="image?.sizes?.full.height"
				:alt="htmlTagsDestroyer(title)"
			/>
			<div class="home-recomendations-small-card__main">
				<h4
					class="home-recomendations-small-card__title"
					v-html="title"
				/>
				<p class="home-recomendations-small-card__text" v-html="text" />
			</div>
			<LinkForwardButton class="home-recomendations-small-card__link">
				{{ $t('details') }}
			</LinkForwardButton>
		</article>
	</component>
</template>

<script setup lang="ts">
import useWebPageStore from '~/store/useWebPageStore';
import LinkForwardButton from './LinkForwardButton.vue';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';

const webPageData = useWebPageStore().data?.data?.data || ({} as any);
const imageReference =
	webPageData?.promotion_area?.special_offer_article.image || '';
const { mediaFile: image } = useMediaFilesStore().useMediaFile(imageReference);

const title = webPageData?.promotion_area?.special_offer_article.title || '';
const text = webPageData?.promotion_area?.special_offer_article.text || '';
const link = webPageData?.promotion_area?.special_offer_article.link || '';
</script>

<style scoped lang="scss">
.home-recomendations-small-card {
	border-radius: 0.125rem;
	border: 0.0625rem solid #212121;
	background: #0f0f0f;
	color: #fff;
	text-decoration: none;
	display: block;
	cursor: pointer;
}
.home-recomendations-small-card__inner {
	display: flex;
	flex-direction: column;
	height: 100%;
	position: relative;
}
.home-recomendations-small-card__main {
	padding: var(--size-1-5);
}
.home-recomendations-small-card__title {
	font-weight: 800;
	font-size: var(--size-1-5);
	margin-bottom: 1rem;
}
.home-recomendations-small-card__text {
	font-size: var(--size-1-125);
	color: #d5d5d5;
	opacity: 0.8;
}
.home-recomendations-small-card__image {
	position: absolute;
	bottom: 0;
	right: 0;
	pointer-events: none;
	width: 10.3125rem;
	height: auto;
	z-index: 0;
}
.home-recomendations-small-card__link {
	margin-top: auto;
}
.home-recomendations-small-card:hover .home-recomendations-small-card__link {
	color: #e4121f;
}
</style>
