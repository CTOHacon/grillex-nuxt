<template>
	<p class="product-page-price" v-if="productVariation?.price">
		{{ priceFormater(productVariation?.price) }}
		<span class="product-page-price__currency">{{ $t('uah') }}</span>
	</p>
</template>

<script setup lang="ts">
import useProductVariationForWebPageStore from '~/store/useProductVariationForWebPageStore';
import priceFormater from '~/utils/priceFormater';
const productVariationStore = useProductVariationForWebPageStore();
const { data: productVariation } = storeToRefs(productVariationStore);
</script>

<style scoped lang="scss">
.product-page-price {
	font-family: 'AA Duke';
	font-weight: 400;
	font-size: var(--size-3);
	line-height: 88%;
	letter-spacing: -0.02em;
	text-transform: uppercase;

	display: flex;
	gap: 0.5rem;
}
.product-page-price__currency {
	color: var(--color-roman-silver);
}
</style>
