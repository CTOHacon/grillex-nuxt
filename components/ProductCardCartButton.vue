<template>
	<div>
		<button
			class="product-card-cart-button"
			v-if="productVariation.stock"
			:class="{ _active: inCart }"
			@click="!inCart && cartStore.addSingleItemToCart(productVariation)"
		>
			<template v-if="!inCart">{{ $t('to_cart') }}</template>
			<template v-else>{{ $t('in_cart') }}</template>
		</button>
		<p class="product-card-not-in-stock" v-else>
			{{ $t('not_in_stock') }}
		</p>
	</div>
</template>

<script setup lang="ts">
import useCartStore from '~/store/useCartStore';
import type { TProductVariation } from '~/types/TProductVariation';

const cartStore = useCartStore();

const props = defineProps<{
	productVariation: TProductVariation;
}>();

const inCart = computed(() => cartStore.isInCart(props.productVariation.id));
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-card-cart-button {
	position: relative;
	padding: 0.5rem 0 0.5rem 1rem;
	font-weight: 600;
	color: #80868e;
	text-decoration-line: underline;
	transition: color 0.3s ease;
	background: none;
	border: none;
	cursor: pointer;
	&:hover {
		color: #e4121f;
	}
	&::before {
		content: '';
		position: absolute;
		right: calc(100% - 0.5rem);
		top: calc(50% - 0.4375rem);
		width: 0.875rem;
		height: 0.875rem;
		opacity: 0;
		transform: translateX(100%);
		transition: opacity 0.3s ease, transform 0.3s ease;
		background: url('~/images/tip-icon.svg') no-repeat center;
		background-size: contain;
	}
	&._active {
		text-decoration-line: none;
		color: #101011 !important;
		&::before {
			opacity: 1;
			transform: translateX(0);
		}
	}
}
.product-card-not-in-stock {
	color: #80868e;
	padding: 0.5rem 0;
}
</style>
