<template>
	<ul class="catalog-modal-navigaion" v-if="data?.catalog_menu">
		<CatalogModalNavigationCard
			class="_grills"
			:image-url="grillsMenuImage?.url"
			:title="data.catalog_menu?.grills_menu?.title || ''"
			:link="data.catalog_menu?.grills_menu?.url || ''"
			:link-text="data.catalog_menu?.grills_menu?.title || ''"
			:items="data.catalog_menu?.grills_menu?.items || []"
		/>
		<CatalogModalNavigationCard
			class="_accessories"
			:image-url="accessoriesMenuImage?.url"
			:title="data.catalog_menu?.accessories_menu?.title || ''"
			:link="data.catalog_menu?.accessories_menu?.url || ''"
			:link-text="data.catalog_menu?.accessories_menu?.title || ''"
			:items="data.catalog_menu?.accessories_menu?.items || []"
		/>
		<CatalogModalNavigationCard
			class="_sauces"
			:image-url="saucesMenuImage?.url"
			:title="data.catalog_menu?.sauces_menu?.title || ''"
			:link="data.catalog_menu?.sauces_menu?.url || ''"
			:link-text="data.catalog_menu?.sauces_menu?.title || ''"
			:items="data.catalog_menu?.sauces_menu?.items || []"
		/>
		<CatalogModalNavigationCard
			class="_cylinders_ignition"
			:image-url="cylindersIgnitionMenuImage?.url"
			:title="data.catalog_menu?.cylinders_ignition_menu?.title || ''"
			:link="data.catalog_menu?.cylinders_ignition_menu?.url || ''"
			:link-text="data.catalog_menu?.cylinders_ignition_menu?.title || ''"
			:items="data.catalog_menu?.cylinders_ignition_menu?.items || []"
		/>
		<CatalogModalNavigationCard
			class="_about_us"
			:noImageCard="true"
			:image-url="''"
			:title="data.catalog_menu?.about_us_menu?.title || ''"
			:link="data.catalog_menu?.about_us_menu?.url || ''"
			:link-text="data.catalog_menu?.about_us_menu?.title || ''"
			:items="data.catalog_menu?.about_us_menu?.items || []"
		/>
	</ul>
</template>

<script setup lang="ts">
import useGlobalSettingsStore from '~/store/useGlobalSettingsStore';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import CatalogModalNavigationCard from './CatalogModalNavigationCard.vue';

const globalSettingsStore = useGlobalSettingsStore();
const mediaFilesStore = useMediaFilesStore();
const { data } = storeToRefs(globalSettingsStore);

const { mediaFile: grillsMenuImage } = mediaFilesStore.useMediaFile(
	data.value?.catalog_menu?.grills_menu?.image || ''
);
const { mediaFile: accessoriesMenuImage } = mediaFilesStore.useMediaFile(
	data.value?.catalog_menu?.accessories_menu?.image || ''
);
const { mediaFile: saucesMenuImage } = mediaFilesStore.useMediaFile(
	data.value?.catalog_menu?.sauces_menu?.image || ''
);
const { mediaFile: cylindersIgnitionMenuImage } = mediaFilesStore.useMediaFile(
	data.value?.catalog_menu?.cylinders_ignition_menu?.image || ''
);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.catalog-modal-navigaion {
	display: grid;
	grid-template-areas:
		'grills grills grills accessories accessories accessories cylinders_ignition cylinders_ignition cylinders_ignition cylinders_ignition'
		'grills grills grills sauces sauces sauces about_us about_us about_us about_us';
	gap: 0.75rem;
	grid-auto-columns: 1fr;
	@media (max-width: $tablet-width) {
		grid-template-areas:
			'grills grills grills accessories accessories accessories'
			'cylinders_ignition cylinders_ignition cylinders_ignition sauces sauces sauces'
			'about_us about_us about_us about_us about_us about_us';
	}
	@media (max-width: $mobile-width) {
		grid-template-areas:
			'grills grills grills'
			'accessories accessories accessories'
			'cylinders_ignition cylinders_ignition cylinders_ignition'
			'sauces sauces sauces'
			'about_us about_us about_us';
	}
	._grills {
		grid-area: grills;
	}
	._accessories {
		grid-area: accessories;
	}
	._sauces {
		grid-area: sauces;
	}
	._cylinders_ignition {
		grid-area: cylinders_ignition;
	}
	._about_us {
		grid-area: about_us;
	}
}
</style>
