<template>
	<div class="cart-modal-footer">
		<p class="cart-modal-footer__total">
			<span>{{ $t('total_price') }}:</span>
			<span>{{ cartStore.totalCartPrice }} {{ $t('uah') }}</span>
		</p>
		<div class="cart-modal-footer__buttons">
			<BaseButton
				class="cart-modal-footer__button"
				@click="modalStateStore.toggleModal('cart')"
				size="medium"
				theme="secondary"
			>
				{{ $t('continue_shopping') }}
			</BaseButton>
			<BaseButton
				class="cart-modal-footer__button"
				size="medium"
				theme="accent"
				:href="localizePath('cart')"
			>
				{{ $t('checkout') }}
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import useCartStore from '~/store/useCartStore';
import useModalStateStore from '~/store/useModalStateStore';

const modalStateStore = useModalStateStore();
const cartStore = useCartStore();
const localizePath = useLocalePath();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.cart-modal-footer {
	background: #fff;
	padding: 1rem;
	z-index: 2;
	box-shadow: 0rem -1.5rem 1.5rem -1.5rem rgba(0, 0, 0, 0.18);
	@media (max-width: $mobile-width) {
		flex-direction: column;
	}
}
.cart-modal-footer__total {
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
}
.cart-modal-footer__buttons {
	display: flex;
	gap: 0.5rem;
	@media (max-width: $mobile-width) {
		flex-direction: column;
	}
}
.cart-modal-footer__button {
	font-size: 0.875rem;
	flex: 1;
}
</style>
