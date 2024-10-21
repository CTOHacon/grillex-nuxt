<template>
	<ProductsCarousel
		v-if="newProducts && newProducts.length"
		:title="$t('new_products')"
		:products="newProducts"
	>
		<template #title>
			<SectionTitle tagname="h2" size="3" class="color-roman-silver">
				{{ $t('new_products') }}
			</SectionTitle>
		</template>
	</ProductsCarousel>
</template>

<script setup lang="ts">
import productService from '~/service/productService';
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
