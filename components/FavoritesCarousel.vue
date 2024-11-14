<template>
	<ProductsCarousel v-if="products.length > 0" :products="products">
		<template #title>
			<SectionTitle tagname="h2" size="3" class="color-roman-silver">
				{{ $t('you_liked') }}
			</SectionTitle>
		</template>
	</ProductsCarousel>
</template>

<script setup lang="ts">
import ProductsCarousel from './ProductsCarousel.vue';
import useFavoritesStore from '~/store/useFavoritesStore';

const favoritesStore = useFavoritesStore();
const products = computed<any>(() => {
	return favoritesStore.favoriteItems.value
		.filter(item => item.product !== undefined)
		.map(item => item.product);
});
</script>

<style lang="scss" scoped></style>
