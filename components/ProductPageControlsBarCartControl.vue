<template>
	<div class="product-page-controls-bar-cart-control">
		<ProductPagePrice
			class="product-page-controls-bar-cart-control__price"
		/>
		<ProductPageAddToCartButton
			class="product-page-controls-bar-cart-control__button"
		/>
	</div>
</template>

<script setup lang="ts">
import ProductPagePrice from './ProductPagePrice.vue';
import ProductPageAddToCartButton from './ProductPageAddToCartButton.vue';
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-page-controls-bar-cart-control {
	display: flex;
	align-items: center;
	gap: 1rem;
}
.product-page-controls-bar-cart-control__price {
	padding-top: 0.5rem;
	font-size: var(--size-2);
	white-space: nowrap;
}
.product-page-controls-bar-cart-control__button {
	font-size: 0.85rem;
	max-width: 12.5rem;
	flex: 1;
	@media (max-width: $mobile-width) {
		font-size: 0.75rem;
		max-width: 10rem;
	}
}
</style>
