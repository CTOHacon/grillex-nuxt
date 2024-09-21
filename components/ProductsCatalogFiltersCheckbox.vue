<template>
	<label
		class="catalog-product-filters-checkbox"
		:for="'filter-option-' + value"
	>
		<input
			class="catalog-product-filters-checkbox__input"
			:id="'filter-option-' + value"
			:name="'filter-option-' + value"
			:value="value"
			type="checkbox"
			:checked="store.appliedProductFilterOptions.includes(value)"
			@change="store.toggleProductFilterOption(value)"
		/>
		<span class="catalog-product-filters-checkbox__checkmark"></span>
		<span class="catalog-product-filters-checkbox__label">{{ label }}</span>
	</label>
</template>

<script setup lang="ts">
import useProductsCatalogFilteringStore from '~/store/useProductsCatalogFilteringStore';

const store = useProductsCatalogFilteringStore();

defineProps<{
	label: string;
	value: number;
}>();
</script>

<style scoped lang="scss">
.catalog-product-filters-checkbox {
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 0.375rem 0;
	user-select: none;
}
.catalog-product-filters-checkbox__input {
	display: none;
}
.catalog-product-filters-checkbox__checkmark {
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.0625rem;
	background: #d4d4d4;
	width: 1rem;
	height: 1rem;
	margin-right: 0.5rem;
	position: relative;
	transition: background 0.2s ease;
	&::before {
		content: '';
		width: 100%;
		height: 100%;
		border-radius: 0.0625rem;
		background: #e4121f;
		transition: transform 0.2s ease;
		transform: scale(0);
	}
}
.catalog-product-filters-checkbox__input:checked
	+ .catalog-product-filters-checkbox__checkmark {
	background: #fff;
}
.catalog-product-filters-checkbox:hover
	.catalog-product-filters-checkbox__checkmark {
	background: #c3c3c3;
}
.catalog-product-filters-checkbox__input:checked
	+ .catalog-product-filters-checkbox__checkmark::before {
	transform: scale(0.7);
}
.catalog-product-filters-checkbox__label {
	font-size: 1rem;
	font-weight: 600;
	line-height: 100%;
}
</style>
