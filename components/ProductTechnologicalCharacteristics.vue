<template>
	<div class="product-technological-characteristics">
		<div
			class="product-technological-characteristics__item"
			v-for="item in items"
			:key="item.title"
		>
			<SectionTitle tagname="h3" size="2" class="mb-1">
				{{ item.title }}
			</SectionTitle>
			<div
				class="product-technological-characteristics__item-description"
				v-html="item.description"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import SectionTitle from './SectionTitle.vue';

defineProps<{
	items: {
		title: string;
		description: string;
	}[];
}>();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-technological-characteristics {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--size-1-5);
	@media (max-width: $tablet-width) {
		grid-template-columns: 1fr;
	}
}
.product-technological-characteristics__item {
	padding: 0.625rem;
	@media (max-width: $tablet-width) {
		padding: 0;
	}
}

.product-technological-characteristics__item-description {
}
</style>
