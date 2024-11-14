<template>
	<ProductCardBaseToggleIconedButton
		class="product-card-to-favorites-button"
		:class="{ _active: inFavourite }"
		@click="favoritesStore.toggleItemInFavorites(product)"
		icon="product-card-like"
	/>
</template>

<script setup lang="ts">
import useFavoritesStore from '~/store/useFavoritesStore';
import type { TProduct } from '~/types/TProduct';
import type { TLoadsProductVariations } from '~/types/TProductVariation';
const props = defineProps<{
	product: TProduct & TLoadsProductVariations;
}>();

const favoritesStore = useFavoritesStore();
const inFavourite = computed(() =>
	favoritesStore.isInFavorites(props.product.id)
);
</script>

<style scoped lang="scss">
.product-card-to-favorites-button {
	position: absolute;
	top: 1rem;
	right: 1rem;
}
</style>
