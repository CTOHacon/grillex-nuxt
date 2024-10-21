<template>
	<div
		v-if="productVariationForWebPage.data"
		class="product-variation-page-shopping-controls"
	>
		<SkuCopyButton
			class="copy-sku"
			:sku="productVariationForWebPage.data.sku"
		/>
		<div class="product-variation-page-shopping-controls__layout">
			<ProductPagePrice />
			<BaseQuantityField
				v-model="addToCartQuantity"
				:max="productVariationForWebPage.data.stock"
				:min="1"
				:disabled="isInCart || !productVariationForWebPage.data.stock"
				class="product-variation-page-shopping-controls__quantity"
			/>
			<BaseButton
				:theme="isInCart ? 'accent-bordered' : 'accent'"
				size="medium"
				class="product-variation-page-shopping-controls__add-to-cart-button"
				v-if="productVariationForWebPage.data.stock"
				@click="addToCart"
			>
				<template v-if="isInCart">
					<SvgIcon
						name="tip-icon"
						class="product-page-add-to-cart-button-tip-icon"
					/>
					{{ $t('in_cart') }}
				</template>
				<template v-else>
					{{ $t('buy') }}
				</template>
			</BaseButton>
			<BaseButton
				theme="accent-bordered"
				size="medium"
				class="product-variation-page-shopping-controls__buy-in-1-click-button"
				v-if="productVariationForWebPage.data.stock"
				@click="oneClickBuy"
			>
				{{ $t('buy_in_1_click') }}
			</BaseButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import useProductVariationForWebPageStore from '~/store/useProductVariationForWebPageStore';
import SkuCopyButton from './SkuCopyButton.vue';
import useCartStore from '~/store/useCartStore';
import useModalStateStore from '~/store/useModalStateStore';

const modalStateStore = useModalStateStore();

const productVariationForWebPage = useProductVariationForWebPageStore();

const {} = useI18n();
const cartStore = useCartStore();
const isInCart = computed(
	() =>
		productVariationForWebPage.data &&
		cartStore.isInCart(productVariationForWebPage.data?.id)
);
const localePath = useLocalePath();

const addToCart = () => {
	if (!productVariationForWebPage.data) return;
	if (!isInCart) {
		cartStore.addItemToCart(
			productVariationForWebPage.data,
			addToCartQuantity.value
		);
	} else {
		modalStateStore.toggleModal('cart');
	}
};
const oneClickBuy = () => {
	if (!productVariationForWebPage.data) return;
	if (!isInCart) {
		cartStore.addItemToCart(
			productVariationForWebPage.data,
			addToCartQuantity.value
		);
	}
	navigateToCart();
};

const navigateToCart = () => {
	location.replace(localePath('/cart'));
};

const addToCartQuantity = ref(1);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.copy-sku {
	margin-left: auto;
	margin-bottom: var(--size-4-5);
	@media (max-width: $mobile-width) {
		margin-right: auto;
		margin-bottom: var(--size-1-5);
	}
}
.product-variation-page-shopping-controls__layout {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	justify-content: space-between;
	column-gap: 0.625rem;
	row-gap: 1.5rem;
	@media (max-width: $mobile-width) {
		gap: 0.5rem;
	}
}
.product-variation-page-shopping-controls__add-to-cart-button {
	@media (max-width: $mobile-width) {
		grid-column: 1 / -1;
	}
}
.product-variation-page-shopping-controls__buy-in-1-click-button {
	@media (max-width: $mobile-width) {
		grid-column: 1 / -1;
	}
}
.product-variation-page-shopping-controls__quantity {
	margin-top: auto;
	margin-left: auto;
}
.product-page-add-to-cart-button-tip-icon {
	width: 1em;
	height: 1em;
	margin-right: 0.5em;
}
</style>
