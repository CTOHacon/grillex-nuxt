<template>
	<div class="catalog-query-settings">
		<CatalogQuerySettingsSelect
			class="catalog-query-settings__sorting-select catalog-query-settings__select"
			:label="$t('at_first')"
			:options="sortingOptions"
			v-model="sorting"
			id="catalog-head-sorting"
		/>
		<CatalogQuerySettingsSelect
			class="catalog-query-settings__select"
			:label="$t('show')"
			:options="perPageCountOptions"
			v-model="perPage"
			id="catalog-head-per-page-count"
		/>
	</div>
</template>

<script setup lang="ts">
import useProductsCatalogFilteringStore from '~/store/useProductsCatalogFilteringStore';
import CatalogQuerySettingsSelect from './CatalogQuerySettingsSelect.vue';

const filteringStore = useProductsCatalogFilteringStore();
const { sortingOptions, perPageCountOptions, sorting, perPage } =
	storeToRefs(filteringStore);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.catalog-query-settings {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	column-gap: 2rem;
	row-gap: 0.2rem;
	@media (max-width: $mobile-width) {
		&__select {
			flex: 1 1 100%;
		}
	}
}

.catalog-query-settings__sorting-select {
	:deep(.catalog-settings-select__select-head) {
		max-width: 10.25rem;
	}
}
</style>
