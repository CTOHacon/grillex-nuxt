<template>
	<div class="cart-modal-head">
		<p class="cart-modal-head__title">
			{{ $t('cart') }}
		</p>
		<div class="cart-modal-head__body">
			<p class="cart-modal-head__total-products">
				{{ cartStore.totalCartQuantity }}
				{{ $t('products') }}
			</p>
			<p
				class="cart-modal-head__gifts-count"
				v-if="cartStore.totalGiftItems"
			>
				+ {{ cartStore.totalGiftItems }}
				{{ $t('in_gift') }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import useCartStore from '~/store/useCartStore';

const cartStore = useCartStore();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.cart-modal-head {
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.125rem;
	box-shadow: 0rem 0rem 1.5rem 0 rgba(0, 0, 0, 0.25);
	z-index: 2;
	background: #fff;
}
.cart-modal-head__title {
	font-size: 1.25rem;
	font-weight: 700;
	@media (max-width: $mobile-width) {
		font-size: 1rem;
	}
}
.cart-modal-head__body {
	font-size: 0.875rem;
	text-align: right;
	display: flex;
	align-items: end;
	gap: 1rem;
	font-weight: 600;
}
.cart-modal-head__total-products {
	color: #80868e;
}
</style>
