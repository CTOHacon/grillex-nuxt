<template>
	<HeaderSpacer />
	<Breadcrumbs class="container" />
	<main class="container _drop-tw product-page-main-content mb-3">
		<ProductPageControlsBar />
		<div class="prodcut-page-content-layout">
			<div class="prodcut-page-content-layout__aside">
				<ProductImagesGallerySlider
					class="prodcut-page-content-layout__aside-slider"
				/>
			</div>
			<div class="prodcut-page-main-layout">
				<ProductVariationPageProductOverview
					class="prodcut-page-main-layout__overview"
				/>
				<ProductVariationPageShoppingControls
					class="prodcut-page-main-layout__shopping-controls"
				/>
				<ProductVariationPageMain
					class="prodcut-page-main-layout__main"
				/>
			</div>
		</div>
		<div class="prodcut-page__sliders">
			<SeparatorLine class="mb-3" />
			<NewProductsCarousel />
			<FavouritesCarousel class="mt-3" />
		</div>
	</main>
</template>

<script setup lang="ts">
import ProductPageControlsBar from '~/components/ProductPageControlsBar.vue';
import ProductVariationPageMain from '~/components/ProductVariationPageMain.vue';
import ProductVariationPageProductOverview from '~/components/ProductVariationPageProductOverview.vue';
import ProductVariationPageShoppingControls from '~/components/ProductVariationPageShoppingControls.vue';
import SeparatorLine from '~/components/SeparatorLine.vue';
import useProductVariationForWebPageStore from '~/store/useProductVariationForWebPageStore';

const productVariationForWebPage = useProductVariationForWebPageStore();
await productVariationForWebPage.fetch();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-page-main-content {
	position: relative;
	background: #fff;
}
.prodcut-page-content-layout {
	display: grid;
	gap: 2.5rem;
	grid-template-columns: 29.5rem calc(100% - 29.6875rem - 2.5rem);
	padding: var(--size-2-5) var(--size-2-5) var(--size-3) var(--size-2-5);

	@media (max-width: $tablet-width) {
		grid-template-columns: 100%;
	}
	@media (max-width: $mobile-width) {
		padding: var(--size-2-5) 1rem var(--size-3) 1rem;
	}
}

.prodcut-page-content-layout__aside-slider {
	position: sticky;
	top: calc(var(--header-height) + 4.9375em);
	@media (max-width: $tablet-width) {
		position: relative;
		top: auto;
	}
}

.prodcut-page-main-layout {
	display: grid;
	grid-template-columns: 1fr 24.875rem;
	grid-auto-rows: min-content;
	grid-template-areas: 'overview shopping-controls' 'main main';
	gap: 1rem;
	@media (max-width: $tablet-width) {
		grid-template-columns: 100%;
		grid-template-areas: 'overview' 'shopping-controls' 'main';
	}
}
.prodcut-page-main-layout__overview {
	grid-area: overview;
}
.prodcut-page-main-layout__shopping-controls {
	grid-area: shopping-controls;
}
.prodcut-page-main-layout__main {
	grid-area: main;
	padding-top: var(--size-3);
}

.prodcut-page__sliders {
	padding: 0 var(--size-3) var(--size-3) var(--size-3);
	@media (max-width: $mobile-width) {
		padding: 0 1rem 1rem 1rem;
	}
}
</style>
