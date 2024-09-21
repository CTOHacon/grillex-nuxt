<template>
	<div class="cart-item-card" v-if="productVariation">
		<div class="cart-item-card__image-wrapper">
			<img
				v-if="getSizeUrl('thumbnail')"
				:src="getSizeUrl('thumbnail')"
				:alt="productVariation.name"
				width="62"
				height="62"
				loading="lazy"
			/>
		</div>
		<div class="cart-item-card__main">
			<p class="cart-item-card__title" v-html="productVariation.name" />
			<div class="cart-item-card__prices">
				<span class="color-red" v-if="cartItem.inGiftQuantity > 0">
					{{ cartItem.inGiftQuantity }}
					{{ $t('in_gift') }}
				</span>
				<span class="color-roman-silver" v-else>
					{{ productVariation.price }} {{ $t('uah') }}
				</span>
				<span>
					{{ cartStore.cartItemTotalPrice(cartItem) }} {{ $t('uah') }}
				</span>
			</div>
		</div>
		<div class="cart-item-card__controls">
			<BaseQuantityField
				class="cart-item-card__controls-quantity"
				:max="productVariation.stock"
				:min="min"
				:model-value="cartItem.quantity"
				@update:model-value="
					(value: number) => cartStore.updateCartItemQuantity(productVariation as TProductVariation, value)
				"
			/>
			<button
				class="cart-item-card__controls-remove"
				type="button"
				:aria-label="$t('delete')"
				:disabled="cartStore.isEntirelyGift(productVariation.id)"
				@click="cartStore.updateCartItemQuantity(productVariation, 0)"
			>
				<SvgIcon name="trash" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { TCartItem } from '~/types/TCartItem';
import useCartStore from '~/store/useCartStore';
import { ref, watchEffect } from 'vue';
import BaseQuantityField from './BaseQuantityField.vue';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import type { TProductVariation } from '~/types/TProductVariation';
import SvgIcon from './SvgIcon.vue';

const cartStore = useCartStore();
const mediaFilesStore = useMediaFilesStore();

const props = defineProps<{
	cartItem: TCartItem;
}>();

const productVariation = computed(() =>
	props.cartItem.product_variation ? props.cartItem.product_variation : null
);

const { getSizeUrl, updateReference } = mediaFilesStore.useMediaFile(
	productVariation.value?.images[0]
);

watchEffect(() => {
	updateReference(productVariation.value?.images[0]);
});

const min = ref(0);
watchEffect(() => {
	min.value = props.cartItem.inGiftQuantity;
});
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.cart-item-card {
	display: flex;
	align-items: center;
	background: #ffffff;
	border-radius: 0.25rem;
	padding: 0.125rem 1.5rem 0.125rem 0.5rem;

	@media (max-width: $mobile-width) {
		flex-wrap: wrap;
		padding: 0.125rem 1em 0.125rem 0.125rem;
	}
}
.cart-item-card__image-wrapper {
	margin-right: 0.875em;
	width: 4.4em;
	height: 4em;
	flex: 0 0 4.4em;
	position: relative;
	overflow: hidden;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		object-position: center bottom;
	}
}
.cart-item-card__title {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	line-height: 1.2;
	margin-bottom: 0.5em;
	font-size: 0.875em;
	font-weight: 600;
	@media (max-width: $mobile-width) {
		height: auto;
	}
}
.cart-item-card__main {
	flex: 1;
	@media (min-width: $mobile-width) {
		padding-right: 0.5em;
		margin-right: 1em;
	}
}
.cart-item-card__prices {
	display: flex;
	font-size: 0.75em;
	font-weight: 700;
	justify-content: space-between;
	gap: 1rem;
}
.cart-item-card__controls {
	display: flex;
	align-items: center;
	margin-left: auto;
	@media (max-width: $mobile-width) {
		width: 100%;
		padding: 1em 0 0.5em 0;
		justify-content: space-between;
	}
}

.cart-item-card__controls-quantity {
	font-size: 1em;
	:deep(.quantity-field__control-button) {
		border: none;
		width: 1.5em;
		height: 1.5em;
	}
	:deep(.quantity-field__input) {
		border: none;
		background: #f9f9f9;
		width: 2em;
		height: 1.5em;
		border-radius: 0.125rem;
	}
}
.cart-item-card__controls-remove {
	padding: 0;
	margin-left: 1.5rem;
	cursor: pointer;
	svg {
		width: 1.25rem;
		height: 1.25rem;
	}
	&:hover {
		color: #e4121f;
	}
	&:disabled {
		color: #80868e;
		cursor: not-allowed;
	}
}
</style>
