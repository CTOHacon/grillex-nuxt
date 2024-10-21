<template>
	<ul class="category-advantages">
		<ProductAdvantagesCard
			v-for="advantage in items"
			:icon="advantage.icon"
			:title="advantage.title"
			:description="advantage.description"
			class="category-advantages__card"
		/>
	</ul>
</template>

<script setup lang="ts">
import type { TProductAdvantage } from '~/types/TProductAdvantage';
import ProductAdvantagesCard from './ProductAdvantagesCard.vue';
const props = defineProps<{
	items: TProductAdvantage[];
}>();
</script>

<style scoped lang="scss">
.category-advantages {
	overflow: hidden;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
	flex-wrap: wrap;
	gap: var(--size-2);
}
.category-advantages__card {
}
</style>
