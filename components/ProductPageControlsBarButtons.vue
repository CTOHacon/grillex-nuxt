<template>
	<div class="product-page-controls-bar-buttons">
		<!-- <button
			class="product-page-controls-bar-buttons__button"
			:class="{ _active: isIncomparedProducts(productId) }"
			@click="togglecomparedProducts(productId)"
		>
			<svg class="product-page-controls-bar-buttons__icon">
				<use xlink:href="~/images/icons.svg#compare"></use>
			</svg>
		</button> -->
		<button
			class="product-page-controls-bar-buttons__button"
			:class="{ _active: isInFavorites }"
			@click="
				productVariation?.product &&
					favoritesStore.toggleItemInFavorites(
						productVariation?.product
					)
			"
		>
			<SvgIcon
				name="product-card-like"
				class="product-page-controls-bar-buttons__icon"
			/>
		</button>
		<button
			class="product-page-controls-bar-buttons__button none-mw"
			@click="scrollToTop"
		>
			<SvgIcon
				name="to-top-arrow"
				class="product-page-controls-bar-buttons__icon"
			/>
		</button>
	</div>
</template>

<script setup lang="ts">
import useFavoritesStore from '~/store/useFavoritesStore';
import useProductVariationForWebPageStore from '~/store/useProductVariationForWebPageStore';
import SvgIcon from './SvgIcon.vue';

const productVariationStore = useProductVariationForWebPageStore();
const { data: productVariation } = storeToRefs(productVariationStore);

const favoritesStore = useFavoritesStore();
const isInFavorites = computed(
	() =>
		productVariation.value &&
		favoritesStore.isInFavorites(productVariation.value?.product_id)
);

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
};
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-page-controls-bar-buttons {
	display: flex;
	align-items: center;
	background: #f9f9f9;
}
.product-page-controls-bar-buttons__button {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 1.5rem;
	background: none;
	border: none;
	line-height: 1;
	cursor: pointer;
	color: #80868e;
	transition: 0s;
	@media (max-width: $mobile-width) {
		padding: 0 0.5rem;
	}
	&:not(:first-child)::before {
		content: '';
		position: absolute;
		left: 0;
		top: calc(50% - 0.75rem);
		height: 1.5rem;
		width: 1px;
		background: #80868e;
		z-index: 2;
		@media (max-width: $tablet-width) {
			display: none;
		}
	}
	&._active {
		color: #e4121f;
		--fill-color: #e4121f;
		&:hover {
			color: #000;
			--fill-color: #000;
		}
	}
	&:hover {
		color: #e4121f;
	}
}
.product-page-controls-bar-buttons__icon {
	width: 2rem;
	height: 2rem;
}
</style>
