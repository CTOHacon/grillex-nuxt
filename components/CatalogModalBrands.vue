<template>
	<ul class="catalog-modal-brands">
		<li
			class="catalog-modal-brands__item"
			v-if="brandsMenu"
			v-for="(brand, index) in brandsMenu.items"
		>
			<CatalogModalBrandsItem
				:key="index"
				:logo="brand.logo || ''"
				:title="brand.title || ''"
				:url="brand.url || ''"
			/>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import useGlobalSettingsStore from '~/store/useGlobalSettingsStore';

const { getData } = useGlobalSettingsStore();
const brandsMenu = getData('brands_menu');
</script>

<style scoped lang="scss">
.catalog-modal-brands {
	// flex-row gap-h-2 justify-around justify-sdw-center pt-1 pb-1
	display: flex;
	column-gap: 2rem;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	padding-top: 1rem;
	padding-bottom: 1rem;
	&__item {
		height: 5.5rem;
	}
}
</style>
