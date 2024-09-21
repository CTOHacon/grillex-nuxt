<template>
	<ProductsCarousel
		v-if="newProducts && newProducts.length"
		:title="$t('new_products')"
		:products="newProducts"
	/>
</template>

<script setup lang="ts">
import productService from '~/service/productService';
import ProductsCarousel from './ProductsCarousel.vue';
import useMediaFilesStore from '~/store/useMediaFilesStore';
const { addMediaFilesToLoad, loadMediaFiles } = useMediaFilesStore();

const { data: newProducts } = await useAsyncData(() => {
	const result = productService.fetchAllByQuery({
		is_new: true
	});
	return result;
});
addMediaFilesToLoad(newProducts);
await loadMediaFiles();
</script>

<style lang="scss" scoped></style>
