<template>
	<div
		class="product-variation-page-product-overview"
		v-if="productVariationForWebPage.data"
	>
		<div class="product-variation-page-product-overview__head">
			<img
				v-if="brandLogo"
				:src="brandLogo.url"
				:alt="brandLogo.title"
				:width="brandLogo.sizes?.full.width || 100"
				:height="brandLogo.sizes?.full.height || 50"
				class="product-variation-page-product-overview__brand-logo"
			/>
			<ProductStockStatus
				:stock="productVariationForWebPage.data.stock"
			/>
		</div>
		<h1 class="product-variation-page-product-overview__title">
			{{
				productVariationForWebPage.data.name ||
				productVariationForWebPage.data.product.name
			}}
		</h1>
		<p
			class="product-variation-page-product-overview__short-description"
			v-if="
				productVariationForWebPage.data.product.product_full_info
					.short_description
			"
			v-html="
				productVariationForWebPage.data.product.product_full_info
					.short_description
			"
		/>
	</div>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import useProductVariationForWebPageStore from '~/store/useProductVariationForWebPageStore';
import ProductStockStatus from './ProductStockStatus.vue';

const productVariationForWebPage = useProductVariationForWebPageStore();
const { useMediaFile } = useMediaFilesStore();

const brandLogoReference =
	productVariationForWebPage.data?.product.product_full_info.brand_logo;
const { mediaFile: brandLogo } = useMediaFile(brandLogoReference);
</script>

<style scoped lang="scss">
.product-variation-page-product-overview__head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: var(--size-1-5);
}
.product-variation-page-product-overview__brand-logo {
	max-width: 5rem;
	width: auto;
	height: var(--size-2);
}
.product-variation-page-product-overview__title {
	max-width: 28.125rem;
	font-family: 'AA Duke';
	font-weight: 400;
	font-size: var(--size-3-5);
	line-height: 88%;
	letter-spacing: -0.02em;
	text-transform: uppercase;
	margin-bottom: 1rem;
}
.product-variation-page-product-overview__short-description {
	font-weight: 500;
	font-size: 1rem;
	line-height: 150%;
	max-width: 30.5rem;
	strong {
		font-weight: 700;
	}
}
</style>
