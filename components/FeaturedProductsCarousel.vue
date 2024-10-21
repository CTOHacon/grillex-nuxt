<template>
	<ProductsCarousel
		v-if="newProducts && newProducts.length"
		:products="newProducts"
	>
		<template #title>
			<SectionTitle tagname="h2" size="3" class="color-roman-silver">
				{{ $t('recommended_to_view') }}
			</SectionTitle>
		</template>
	</ProductsCarousel>
</template>

<script setup lang="ts">
import productService from '~/service/productService';
import ProductsCarousel from './ProductsCarousel.vue';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import SectionTitle from './SectionTitle.vue';
const { addMediaFilesToLoad, loadMediaFiles } = useMediaFilesStore();

const { data: newProducts } = await useAsyncData(() => {
	const result = productService.fetchAllByQuery({
		is_featured: true
	});
	return result;
});
addMediaFilesToLoad(newProducts);
await loadMediaFiles();
</script>

<style lang="scss" scoped></style>
