<template>
	<div class="home-promotion-area-product flex-column">
		<img
			v-if="image"
			:src="image.url"
			:width="image.sizes?.full.width"
			:height="image.sizes?.full.height"
			loading="lazy"
			:alt="htmlTagsDestroyer(title)"
			class="home-promotion-area-product__image"
		/>
		<h2
			v-if="title"
			class="home-promotion-area-product__title home-promotion-area-product__width-wrapper"
			v-html="title"
		/>
		<p
			v-if="subtitle"
			class="home-promotion-area-product__subtitle home-promotion-area-product__width-wrapper"
			v-html="subtitle"
		/>
		<p
			v-if="text"
			class="home-promotion-area-product__text home-promotion-area-product__width-wrapper"
			v-html="text"
		/>
		<p
			class="home-promotion-area-product__product-title color-semi-gray opc-0-8 mb-1 mt-auto"
		>
			{{ $t('product_on_photo') }}
		</p>
		<HomePromotionAreaProductCard
			v-if="product"
			:product="product"
			class="home-promotion-area-product__width-wrapper"
		/>
	</div>
</template>

<script setup lang="ts">
import productService from '~/service/productService';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import useWebPageStore from '~/store/useWebPageStore';
import type { TProduct } from '~/types/TProduct';
import type { TLoadsProductVariations } from '~/types/TProductVariation';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';
import HomePromotionAreaProductCard from './HomePromotionAreaProductCard.vue';

// import HomeRecomendationsProductCard from './HomeRecomendationsProductCard.vue';

const webPageData = useWebPageStore().data?.data?.data || ({} as any);
const title = webPageData?.promotion_area?.promo_product.title || '';
const subtitle = webPageData?.promotion_area?.promo_product.subtitle || '';
const text = webPageData?.promotion_area?.promo_product.text || '';

const mediaFilesStore = useMediaFilesStore();
const imageReference = webPageData?.promotion_area?.promo_product.image || '';
const { mediaFile: image } = mediaFilesStore.useMediaFile(imageReference);

const productId = webPageData?.promotion_area?.promo_product.product_id || '';
const product = ref<TProduct & TLoadsProductVariations>();
try {
	product.value = await productService.fetch(productId);
	mediaFilesStore.addMediaFilesToLoad(product.value.image);
	await mediaFilesStore.loadMediaFiles();
} catch (error) {
	console.error(error);
}
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-promotion-area-product {
	padding: 6rem 0 2.25rem 5rem;
	background: #0f0f0f;
	border: 0.0625rem solid #212121;
	position: relative;
	@media (max-width: $tablet-width) {
		padding: 1.5rem;
	}
	@media (max-width: $mobile-width) {
		padding: 1rem;
	}
}
.home-promotion-area-product__width-wrapper {
	max-width: 35.3125rem;
	position: relative;
	@media (max-width: $tablet-width) {
		max-width: 100%;
	}
}
.home-promotion-area-product__title {
	font-family: 'AA Duke';
	font-weight: 400;
	font-size: 5.5rem;
	line-height: 88%;
	text-transform: uppercase;
	color: #ffffff;
	margin-bottom: var(--size-1-5);
}
.home-promotion-area-product__subtitle {
	font-family: 'AA Duke';
	font-weight: 400;
	font-size: 3.5rem;
	line-height: 96%;
	text-transform: uppercase;
	color: #a57a45;
}
.home-promotion-area-product__text {
	margin-top: var(--size-3);
	margin-bottom: var(--size-3);
	font-size: 1.125rem;
	letter-spacing: -0.02em;
	color: #d5d5d5;
	opacity: 0.8;
}
.home-promotion-area-product__image {
	position: absolute;
	bottom: 0;
	right: 0;
	pointer-events: none;
	z-index: 0;
	max-width: 39.375rem;
	max-height: 39.375rem;
	height: 100%;
	width: auto;
	z-index: 0;
	@media (max-width: $tablet-width) {
		display: none;
	}
}
.home-promotion-area-product__product-title {
	font-size: 1.125rem;
	color: #d5d5d5;
	opacity: 0.8;
	margin-top: auto;
}
</style>
