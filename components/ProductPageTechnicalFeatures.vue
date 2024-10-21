<template>
	<ul class="product-page-technical-features">
		<ProductPageTechnicalFeaturesCard
			v-for="(item, index) in items"
			:key="index"
			:icon="item.icon"
			:title="item.title"
			:description="item.description"
		/>
	</ul>
</template>

<script setup lang="ts">
import type { TProductTechnologicalFeature } from '~/types/TProductTechnologicalFeature';
import ProductPageTechnicalFeaturesCard from './ProductPageTechnicalFeaturesCard.vue';

defineProps<{
	items: TProductTechnologicalFeature[];
}>();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-page-technical-features {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	@media (max-width: $tablet-width) {
		grid-template-columns: 1fr;
	}
}
</style>
