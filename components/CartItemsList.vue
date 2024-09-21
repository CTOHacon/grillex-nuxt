<template>
	<div class="cart-items-list">
		<CartItemCard
			v-for="item in cartStore.cartItems"
			:key="item.product_variation_id"
			:cartItem="item"
		/>
	</div>
</template>

<script setup lang="ts">
import useCartStore from '~/store/useCartStore';
import CartItemCard from './CartItemCard.vue';

const cartStore = useCartStore();
</script>

<style scoped lang="scss">
.cart-items-list {
	padding: 0.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.125rem;
	overflow: auto;
	position: relative;
}
</style>
