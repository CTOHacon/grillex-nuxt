<template>
	<ProductsCarousel v-if="products.length" :products="products">
		<template #title>
			<SectionTitle tagname="h2" size="3" class="color-roman-silver">
				{{ props.title }}
			</SectionTitle>
		</template>
	</ProductsCarousel>
</template>

<script setup lang="ts">
import productService from '~/service/productService';
import ProductsCarousel from '../ProductsCarousel.vue';
import type { TProduct } from '~/types/TProduct';
import type { TLoadsProductVariations } from '~/types/TProductVariation';
import useMediaFilesStore from '~/store/useMediaFilesStore';

const props = defineProps<{
	title: string;
	products: number[];
}>();

const products = ref<(TProduct & TLoadsProductVariations)[]>([]);

products.value = await productService.fetchSelection(props.products);
const mediaFilesStore = useMediaFilesStore();
mediaFilesStore.addMediaFilesToLoad(
	products.value.map(product => product.image)
);
await mediaFilesStore.loadMediaFiles();
</script>

<style scoped></style>
