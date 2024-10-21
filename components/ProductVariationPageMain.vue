<template>
	<div>
		<ProductAdvantages
			v-if="productAdvantages?.length"
			class="mb-3"
			:items="productAdvantages"
		/>
		<template v-if="productTechnologicalFeatures?.length">
			<SectionTitle tagname="h2" size="2" class="mb-1 color-roman-silver">
				{{ $t('technological_features_title') }}
			</SectionTitle>
			<ProductPageTechnicalFeatures
				class="mb-3"
				:items="productTechnologicalFeatures"
			/>
		</template>
		<SectionTitle tagname="h2" size="2" class="mb-1">
			{{ $t('technological_characteristics_title') }}
		</SectionTitle>
		<img
			v-if="technologicalCharacteristicsImage"
			:src="technologicalCharacteristicsImage.url"
			:alt="technologicalCharacteristicsImage.title"
			:width="technologicalCharacteristicsImage.sizes?.full.width"
			:height="technologicalCharacteristicsImage.sizes?.full.height"
			class="mb-2 technological-characteristics-image"
			loading="lazy"
		/>
		<ProductTechnologicalCharacteristics
			v-if="productTechnologicalCharacteristics?.length"
			class="mb-3"
			:items="productTechnologicalCharacteristics"
		/>
		<SectionTitle tagname="h2" size="3" class="mb-3">
			{{ $t('product_description') }}
		</SectionTitle>
		<div
			class="product-full-description mb-3 typography-content"
			v-html="productDescription"
		/>
		<FeaturedProductsCarousel />
	</div>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import useProductVariationForWebPageStore from '~/store/useProductVariationForWebPageStore';
import ProductTechnologicalCharacteristics from './ProductTechnologicalCharacteristics.vue';
import SectionTitle from './SectionTitle.vue';
import FeaturedProductsCarousel from './FeaturedProductsCarousel.vue';

const productVariationForWebPage = useProductVariationForWebPageStore();
const { useMediaFile } = useMediaFilesStore();

const productAdvantages =
	productVariationForWebPage.data?.product.product_full_info
		.product_advantages;

const productTechnologicalFeatures =
	productVariationForWebPage.data?.product.product_full_info
		.product_technological_features;

const technologicalCharacteristicsImageReference =
	productVariationForWebPage.data?.product.product_full_info
		.technological_characteristics_image;

const { mediaFile: technologicalCharacteristicsImage } = useMediaFile(
	technologicalCharacteristicsImageReference
);

const productTechnologicalCharacteristics =
	productVariationForWebPage.data?.product.product_full_info
		.general_characteristics;

const productDescription =
	productVariationForWebPage.data?.product.product_full_info.full_description;
</script>

<style scoped lang="scss">
.technological-characteristics-image {
	width: 100%;
	height: auto;
}
.product-full-description {
	max-width: 55.1875rem;
}
</style>
