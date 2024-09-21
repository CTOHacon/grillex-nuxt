<template>
	<article
		class="home-promotion-area-product-card"
		v-if="product && productBaseVariation"
	>
		<div class="home-promotion-area-product-card__image-container">
			<img
				v-if="image"
				:src="image.url"
				:alt="htmlTagsDestroyer(product.name)"
				width="140"
				height="140"
				loading="lazy"
			/>
		</div>
		<div class="home-promotion-area-product-card__main">
			<h3
				class="home-promotion-area-product-card__title"
				v-html="product.name"
			/>
			<div
				class="home-promotion-area-product-card__controls flex-row align-center mt-auto"
			>
				<a
					class="home-promotion-area-product-card__link"
					v-if="productBaseVariation"
					:href="productBaseVariation.web_page.compiled_path"
				>
					{{ $t('details') }}
				</a>
				<button
					:class="{
						_active: isInCart
					}"
					@click="
						!isInCart &&
							cartStore.addSingleItemToCart(productBaseVariation)
					"
					class="home-promotion-area-product-card__cart-button"
				>
					{{ isInCart ? $t('in_cart') : $t('buy') }}
				</button>
			</div>
		</div>
	</article>
</template>

<script setup lang="ts">
import useCartStore from '~/store/useCartStore';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import type { TProduct } from '~/types/TProduct';
import type { TLoadsProductVariations } from '~/types/TProductVariation';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';

const props = defineProps<{
	product: TProduct & TLoadsProductVariations;
}>();

const productBaseVariation = props?.product?.product_variations?.length
	? props?.product?.product_variations[0]
	: null;

const image = useMediaFilesStore().useMediaFile(props.product.image).mediaFile
	.value;

const cartStore = useCartStore();

const isInCart = computed(
	() => productBaseVariation && cartStore.isInCart(productBaseVariation.id)
);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-promotion-area-product-card {
	display: flex;
	border-radius: 0.0625rem;
	border: 0.0625rem solid #212121;
	background: #212121;
	position: relative;
	@media (max-width: $mobile-width) {
		display: block;
	}
}
.home-promotion-area-product-card__image-container {
	min-width: 8.75rem;
	height: 8.75rem;
	overflow: hidden;
	background: #111;
	min-height: 100%;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	@media (max-width: $mobile-width) {
		width: 100%;
		height: 12.5rem;
		min-height: auto;
		img {
			object-fit: contain;
		}
	}
}
.home-promotion-area-product-card__main {
	display: flex;
	flex-direction: column;
	font-size: var(--size-1-125);
	padding: 1rem 1rem 1rem 1.5rem;
	min-height: 100%;
	width: 100%;
	@media (max-width: $mobile-width) {
		min-height: auto;
	}
}
.home-promotion-area-product-card__title {
	font-weight: 700;
	color: #ffffff;
}
.home-promotion-area-product-card__link {
	display: flex;
	align-items: center;
	height: 100%;
	color: rgba(212, 212, 212, 0.48);
	text-decoration: underline;
	transition: color 0.3s ease;
	padding: 0 1.5rem;
	&:hover {
		color: #a57a45;
	}
}
.home-promotion-area-product-card__controls {
	display: flex;
	align-items: center;
	justify-content: end;
	margin-top: auto;
}
.home-promotion-area-product-card__cart-button {
	border-radius: 0.75rem;
	background: none;
	border: 0.0625rem solid #fff;
	color: #fff;
	font-weight: 600;
	padding: 0.6875rem 1.5rem;
	cursor: pointer;
	transition: background 0.3s ease, color 0.3s ease;
	&:hover,
	&._active {
		background: #fff;
		color: #000;
	}
	&._active {
		opacity: 0.5;
		cursor: default;
	}
	@media (max-width: $tablet-width) {
		flex: 100%;
		margin-top: 1rem;
	}
}
</style>
