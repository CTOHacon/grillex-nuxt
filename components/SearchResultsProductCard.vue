<template>
	<article class="search-results-product-card">
		<!-- <ProductCardToCompareButton :product="product" />
		<ProductCardExtraStatus :extraStatus="product.extraStatus" />
		<ProductCardToFavouritesButton :product="product" /> -->
		<a
			:href="productPath"
			:aria-label="product.name"
			:title="product.name"
			class="search-results-product-card__image-wrapper"
		>
			<ServerImage
				:reference="product.image"
				:alt="product.name"
				size="thumbnail"
			/>
		</a>
		<div class="search-results-product-card__main">
			<!-- <ProductCardAboutCredit :product="product" /> -->
			<h3 class="search-results-product-card__name">
				<a :href="productPath" class="reset-link" itemprop="url">
					<span itemprop="name">{{ product.name }}</span>
				</a>
			</h3>
			<div class="search-results-product-card__offer">
				<p class="search-results-product-card__price">
					<span
						class="search-results-product-card__price-value"
						itemprop="price"
						>{{ productPrice }}</span
					>
					<span class="search-results-product-card__price-currency">{{
						$t('uah')
					}}</span>
				</p>
				<ProductCardCartButton
					:product-variation="product.product_variations[0]"
				/>
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
import type { TProduct } from '~/types/TProduct';
import type { TLoadsProductVariations } from '~/types/TProductVariation';
const props = defineProps<{
	product: TProduct & TLoadsProductVariations;
}>();

const baseVariation = computed(() => {
	return props.product.product_variations[0];
});
const productPath = computed(() => {
	return `/${baseVariation.value.web_page.compiled_path}`;
});
const productPrice = computed(() => {
	// the diapason of variation prices
	const prices = props.product.product_variations.map(
		variation => variation.price
	);
	const min = Math.min(...prices);
	const max = Math.max(...prices);
	if (min === max) return min;
	return `${Math.min(...prices)} - ${Math.max(...prices)}`;
});
const isInStock = computed(() => {
	return props.product.product_variations.some(
		variation => variation.stock > 0
	);
});
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.search-results-product-card {
	display: flex;
	gap: 1rem;
	height: 100%;
	border: 0.0625rem solid #d4d4d4;
	margin-right: -0.0625rem;
	margin-bottom: -0.0625rem;
	background: #fff;
	position: relative;
	box-shadow: 0 0 0 0.0625rem transparent inset;
	transition: box-shadow 0.3s ease;
	border-radius: 0.25rem;
}
.search-results-product-card__main {
	display: flex;
	flex-direction: column;
	padding: 0.5rem 1rem 0 0.5rem;
	flex: 1;
}
.search-results-product-card__extra-status {
	z-index: 3;
}
.search-results-product-card__image-wrapper {
	position: relative;
	aspect-ratio: 1 / 1;
	width: 5rem;
	overflow: hidden;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		transition: transform 0.3s ease;
		@media (max-width: $mobile-width) {
			object-fit: contain;
		}
	}
	@media (max-width: $mobile-width) {
		max-height: 30vh;
	}
}
.search-results-product-card:hover
	.search-results-product-card__image-wrapper
	img {
	transform: scale(1.05);
}
.search-results-product-card:hover
	:deep(.search-results-product-card-about-credit__provider)
	img {
	filter: sepia(0) saturate(100%);
}

.search-results-product-card__name {
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 0.25rem;
	max-width: 20rem;
}
.search-results-product-card__offer {
	margin-top: auto;
	display: flex;
	justify-content: space-between;
	gap: 0.5rem;
}
.search-results-product-card__price {
	display: flex;
	align-items: center;
	font-weight: 600;
}
.search-results-product-card__price-value {
	font-size: 1rem;
	margin-right: 0.25rem;
}
.search-results-product-card__price-currency {
	font-size: 0.875rem;
}
.search-results-product-card__to-compare-button {
	left: 1rem;
}
.search-results-product-card__to-favourites-button {
	right: 1rem;
}
</style>
