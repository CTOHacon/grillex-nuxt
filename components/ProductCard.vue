<template>
	<article class="product-card">
		<!-- <ProductCardToCompareButton :product="product" />
		<ProductCardExtraStatus :extraStatus="product.extraStatus" />
		<ProductCardToFavoritesButton :product="product" /> -->
		<ProductCardToFavoritesButton :product="product" />
		<ProductCardStatuses
			class="product-card__extra-status"
			:product="product"
		/>
		<a
			:href="productPath"
			:aria-label="product.name"
			:title="product.name"
			class="product-card__image-wrapper"
		>
			<ServerImage
				:reference="product.image"
				:alt="product.name"
				size="thumbnail"
			/>
		</a>
		<!-- <ProductCardAboutCredit :product="product" /> -->
		<h3 class="product-card__name">
			<a :href="productPath" class="reset-link" itemprop="url">
				<span itemprop="name">{{ product.name }}</span>
			</a>
		</h3>
		<div class="product-card__offer">
			<p class="product-card__price">
				<span class="product-card__price-value" itemprop="price">{{
					productPrice
				}}</span>
				<span class="product-card__price-currency">{{
					$t('uah')
				}}</span>
			</p>
			<ProductCardCartButton
				:product-variation="product.product_variations[0]"
			/>
		</div>
	</article>
</template>

<script setup lang="ts">
import type { TProduct } from '~/types/TProduct';
import type { TLoadsProductVariations } from '~/types/TProductVariation';
import ProductCardStatuses from './ProductCardStatuses.vue';
import ProductCardToFavoritesButton from './ProductCardToFavoritesButton.vue';

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
.product-card {
	display: flex;
	height: 100%;
	flex-direction: column;
	padding: 1rem;
	border: 0.0625rem solid #d4d4d4;
	margin-right: -0.0625rem;
	margin-bottom: -0.0625rem;
	background: #fff;
	position: relative;
	cursor: pointer;
	box-shadow: 0 0 0 0.0625rem transparent inset;
	transition: box-shadow 0.3s ease;
}
.product-card__extra-status {
	position: absolute;
	top: 1rem;
	left: 50%;
	transform: translateX(-50%);
	z-index: 3;
}
.product-card__image-wrapper {
	position: relative;
	aspect-ratio: 1 / 1;
	width: 100%;
	overflow: hidden;
	margin-bottom: 0.5rem;
	border: 0.25rem solid #fff;
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
.product-card:hover .product-card__image-wrapper img {
	transform: scale(1.05);
}
.product-card:hover :deep(.product-card-about-credit__provider) img {
	filter: sepia(0) saturate(100%);
}

.product-card__name {
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 0.25rem;
}
.product-card__offer {
	margin-top: auto;
	display: flex;
	justify-content: space-between;
	gap: 0.5rem;
}
.product-card__price {
	display: flex;
	align-items: center;
	font-weight: 600;
}
.product-card__price-value {
	font-size: 1rem;
	margin-right: 0.25rem;
}
.product-card__price-currency {
	font-size: 0.875rem;
}
.product-card__to-compare-button {
	left: 1rem;
}
.product-card__to-favorites-button {
	right: 1rem;
}
</style>
