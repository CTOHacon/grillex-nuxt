<template>
	<ProductsCarousel
		v-if="products.length > 0"
		:title="$t('you_liked')"
		:products="products"
	/>
</template>

<script setup lang="ts">
import ProductsCarousel from './ProductsCarousel.vue';
import useFavouritesStore from '~/store/useFavouritesStrore';

const favouritesStore = useFavouritesStore();
const products = computed<any>(() => {
	return favouritesStore.favouriteItems
		.filter(item => item.product !== undefined)
		.map(item => item.product);
});
</script>

<style lang="scss" scoped></style>
