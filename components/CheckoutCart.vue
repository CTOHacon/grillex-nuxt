<template>
	<div class="checkout-cart">
		<CartModalHead class="checkout-cart__head" />
		<CartItemsList class="checkout-cart__items-list" />
		<div class="checkout-cart__totals">
			<p class="checkout-cart__totals-price">
				<span>{{ $t('total_price') }}</span>
				<span>{{ cart.totalCartPrice }} {{ $t('uah') }}</span>
			</p>
			<p class="checkout-cart__totals-shipping">
				<span>{{ $t('shipping') }}</span>
				<span class="color-red">{{ $t('free') }}</span>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import useCartStore from '~/store/useCartStore';
import CartItemsList from './CartItemsList.vue';
import CartModalHead from './CartModalHead.vue';

const cart = useCartStore();
</script>

<style scoped lang="scss">
.checkout-cart {
	background: rgba(249, 249, 249, 1);
	display: flex;
	flex-direction: column;
}
.checkout-cart__items-list {
	flex: 1;
	overflow-y: auto;
}
.checkout-cart__totals {
	overflow: hidden;
	border-top: 0.0625rem solid rgba(212, 212, 212, 1);
	padding: var(--size-1-5) var(--size-2);
	background: #f9f9f9;
	box-shadow: 0px -1.5rem 1.5rem -1.25rem rgba(0, 0, 0, 0.25);
	z-index: 2;
}
.checkout-cart__head {
	background: #f9f9f9;
}
.checkout-cart__totals-price {
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 0.25rem;
}
.checkout-cart__totals-shipping {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 1rem;
}
</style>
