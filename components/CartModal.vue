<template>
	<BaseModal
		modal-name="cart"
		:lock-scroll="true"
		:leave-header-space="true"
		class="cart-modal"
	>
		<div
			class="container _drop-tw cart-modal__inner"
			@click="handleOutsideClick"
		>
			<div class="cart-modal__body">
				<CartModalHead />
				<CartItemsList class="cart-modal__items-list" />
				<CartModalFooter class="cart-modal__bottom" />
			</div>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue';
import CartItemsList from './CartItemsList.vue';
import CartModalHead from './CartModalHead.vue';
import useModalStateStore from '~/store/useModalStateStore';
import CartModalFooter from './CartModalFooter.vue';

const modalStateStore = useModalStateStore();

const handleOutsideClick = (e: MouseEvent) => {
	if (e.target === e.currentTarget) {
		modalStateStore.toggleModal('cart');
	}
};
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';

.cart-modal__head {
	background: #fff;
}
.cart-modal__body {
	margin-left: auto;
	background: #eee;
	border-radius: 0.125rem;
	max-height: min(35rem, calc(100vh - var(--header-height)));
	display: flex;
	flex-direction: column;
	max-width: 31.25rem;
	overflow: hidden;
	@media (max-width: $tablet-width) {
		margin: 0;
		max-height: unset;
		height: calc(100vh - var(--header-height));
		max-width: 100%;
	}
}

.cart-modal__items-list {
	flex: 1;
}
</style>
