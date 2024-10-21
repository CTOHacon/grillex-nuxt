<template>
	<ProductCardBaseToggleIconedButton
		class="product-card-to-favourites-button"
		:class="{ _active: inFavourite }"
		@click="favouritesStore.toggleItemInFavourites(product)"
		icon="product-card-like"
	/>
</template>

<script setup lang="ts">
import useFavouritesStore from '~/store/useFavouritesStrore';
import type { TProduct } from '~/types/TProduct';
import type { TLoadsProductVariations } from '~/types/TProductVariation';
const props = defineProps<{
	product: TProduct & TLoadsProductVariations;
}>();

const favouritesStore = useFavouritesStore();
const inFavourite = computed(() =>
	favouritesStore.isInFavourites(props.product.id)
);
</script>

<style scoped lang="scss">
.product-card-to-favourites-button {
	position: absolute;
	top: 1rem;
	right: 1rem;
}
</style>
