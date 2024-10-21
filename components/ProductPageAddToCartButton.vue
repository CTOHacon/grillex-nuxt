<template>
	<BaseButton
		theme="accent"
		size="medium"
		v-if="!inCart"
		@click="
			() => {
				productVariation && cartStore.addItemToCart(productVariation);
			}
		"
	>
		{{ $t('buy') }}
	</BaseButton>
	<BaseButton
		theme="accent-bordered"
		size="medium"
		v-else
		@click="
			() => {
				modalStateStore.toggleModal('cart');
			}
		"
	>
		<SvgIcon
			name="tip-icon"
			class="product-page-add-to-cart-button-tip-icon"
		/>
		{{ $t('in_cart') }}
	</BaseButton>
</template>

<script setup lang="ts">
import useCartStore from '~/store/useCartStore';
import BaseButton from './BaseButton.vue';
import useProductVariationForWebPageStore from '~/store/useProductVariationForWebPageStore';
import SvgIcon from './SvgIcon.vue';
import useModalStateStore from '~/store/useModalStateStore';

const modalStateStore = useModalStateStore();

const productVariationStore = useProductVariationForWebPageStore();
const { data: productVariation } = storeToRefs(productVariationStore);

const cartStore = useCartStore();
const inCart = computed(
	() =>
		productVariation.value && cartStore.isInCart(productVariation.value?.id)
);
</script>

<style scoped lang="scss">
.product-page-add-to-cart-button-tip-icon {
	width: 1em;
	height: 1em;
	margin-right: 0.5em;
}
</style>
