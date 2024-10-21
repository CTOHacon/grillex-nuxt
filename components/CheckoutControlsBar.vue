<template>
	<nav class="checkout-controls-bar">
		<CheckoutTabsControl class="checkout-controls-bar__tabs" />
		<CheckoutControlsBarClearCartButton
			class="checkout-controls-bar__button"
		/>
	</nav>
</template>

<script setup lang="ts">
import CheckoutControlsBarClearCartButton from './CheckoutControlsBarClearCartButton.vue';
import CheckoutTabsControl from './CheckoutTabsControl.vue';
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.checkout-controls-bar {
	position: sticky;
	z-index: 2;
	top: var(--header-height);
	display: flex;
	border-bottom: 0.0625rem solid #afbacc;
	background: #fff;
}
.checkout-controls-bar__tabs {
	flex: 1;
}
.checkout-controls-bar__button {
	padding: 1rem;
	@media (max-width: $mobile-width) {
		padding: 0.5rem;
	}
}
</style>
