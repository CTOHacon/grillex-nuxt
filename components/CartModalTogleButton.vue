<template>
	<button
		@click="modalStore.toggleModal('cart')"
		class="cart-modal-toggle-button"
		:class="{
			_active: modalStore.isActiveModal('cart'),
			_hasProducts: cartStore.totalCartQuantity > 0
		}"
		:disabled="
			!cartStore.totalCartQuantity && !modalStore.isActiveModal('cart')
		"
		:aria-label="
			modalStore.isActiveModal('cart')
				? $t('close_cart')
				: $t('open_cart')
		"
		type="button"
	>
		<SvgIcon name="cart" class="cart-modal-toggle-button__icon" />
		<span class="cart-modal-toggle-button__text">
			<span>{{ $t('cart') }}</span>
			<span class="cart-modal-toggle-button__counter">
				<template v-if="cartStore.totalCartQuantity"
					>{{ cartStore.totalCartQuantity }}
					{{ $t('products') }}</template
				>
				<span v-else> 0 {{ $t('products') }} </span>
			</span>
		</span>
	</button>
</template>

<script setup lang="ts">
import useCartStore from '~/store/useCartStore';
import useModalStateStore from '~/store/useModalStateStore';
import SvgIcon from './SvgIcon.vue';

const cartStore = useCartStore();
const modalStore = useModalStateStore();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.cart-modal-toggle-button {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	height: var(--button-height);
	padding: 0rem 2.4375rem 0rem 1.4375rem;
	background: none;
	font-weight: 700;
	border: none;
	border-radius: 0.75rem;

	color: inherit;
	cursor: pointer;
	transition: height 0.2s ease-in-out, background-color 0.2s ease-in-out,
		border-color 0.2s ease-in-out;
	&:hover:not(:disabled) {
		border-color: #e4121f;
		background: transparent;
	}
	&:disabled {
		background: #292929;
		border: 0.0625rem solid #292929;
		cursor: not-allowed;
	}
	&._hasProducts {
		background: transparent;
		border: 0.0625rem solid rgba(228, 18, 31, 0.64);
	}
	&._active {
		background: #e4121f;
		border-color: #e4121f;
		.cart-modal-toggle-button__icon {
			color: #fff !important;
		}
		&:hover {
			background: #e4121f;
			border-color: #e4121f;
		}
	}
	@media (max-width: $tablet-width) {
		padding: 0rem 0.75rem;
	}
}

.cart-modal-toggle-button__text {
	display: flex;
	flex-direction: column;
	text-align: left;
}

.cart-modal-toggle-button__icon {
	width: calc(var(--button-height) - 1.5rem);
	height: calc(var(--button-height) - 1.5rem);
	transition: width 0.2s ease-in-out, height 0.2s ease-in-out,
		color 0.2s ease-in-out;
}

.cart-modal-toggle-button__counter {
	color: #80868e;
	font-size: 0.875rem;
	font-weight: 500;
	transition: color 0.2s ease-in-out;
}
.cart-modal-toggle-button._active .cart-modal-toggle-button__counter {
	color: #fff;
}
</style>
