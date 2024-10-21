<template>
	<button class="checkout-controls-bar-clear-cart-button" @click="onClick">
		{{ t('clear_cart') }}
	</button>
</template>

<script setup lang="ts">
import useCartStore from '~/store/useCartStore';

const cartStore = useCartStore();
const { t } = useI18n();

const onClick = () => {
	if (confirm(t('cart_clean_up_confirmation'))) {
		cartStore.clearCart();
	}
};
</script>

<style scoped lang="scss">
.checkout-controls-bar-clear-cart-button {
	font-size: 1rem;
	padding: 0.5rem 2.5rem;
	background-color: #f9f9f9;
	color: #e4121f;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
	text-decoration: underline;
	&:hover {
		background-color: #e4121f;
		color: #f9f9f9;
	}
}
</style>
