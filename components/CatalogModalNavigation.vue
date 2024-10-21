<template>
	<ul class="catalog-modal-navigaion" v-if="catalogMenu">
		<CatalogModalNavigationCard
			class="_grills"
			:image-url="grillsMenuImage?.url"
			:title="catalogMenu?.grills_menu?.title || ''"
			:link="catalogMenu?.grills_menu?.url || ''"
			:link-text="catalogMenu?.grills_menu?.title || ''"
			:items="catalogMenu?.grills_menu?.items || []"
		/>
		<CatalogModalNavigationCard
			class="_accessories"
			:image-url="accessoriesMenuImage?.url"
			:title="catalogMenu?.accessories_menu?.title || ''"
			:link="catalogMenu?.accessories_menu?.url || ''"
			:link-text="catalogMenu?.accessories_menu?.title || ''"
			:items="catalogMenu?.accessories_menu?.items || []"
		/>
		<CatalogModalNavigationCard
			class="_sauces"
			:image-url="saucesMenuImage?.url"
			:title="catalogMenu?.sauces_menu?.title || ''"
			:link="catalogMenu?.sauces_menu?.url || ''"
			:link-text="catalogMenu?.sauces_menu?.title || ''"
			:items="catalogMenu?.sauces_menu?.items || []"
		/>
		<CatalogModalNavigationCard
			class="_cylinders_ignition"
			:image-url="cylindersIgnitionMenuImage?.url"
			:title="catalogMenu?.cylinders_ignition_menu?.title || ''"
			:link="catalogMenu?.cylinders_ignition_menu?.url || ''"
			:link-text="catalogMenu?.cylinders_ignition_menu?.title || ''"
			:items="catalogMenu?.cylinders_ignition_menu?.items || []"
		/>
		<CatalogModalNavigationCard
			class="_about_us"
			:noImageCard="true"
			:image-url="''"
			:title="catalogMenu?.about_us_menu?.title || ''"
			:link="catalogMenu?.about_us_menu?.url || ''"
			:link-text="catalogMenu?.about_us_menu?.title || ''"
			:items="catalogMenu?.about_us_menu?.items || []"
		/>
	</ul>
</template>

<script setup lang="ts">
import useGlobalSettingsStore from '~/store/useGlobalSettingsStore';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import CatalogModalNavigationCard from './CatalogModalNavigationCard.vue';

const { getData } = useGlobalSettingsStore();
const mediaFilesStore = useMediaFilesStore();

const catalogMenu = getData('catalog_menu');

const grillsMenuImageReference = getData('catalog_menu.grills_menu.image');
const { mediaFile: grillsMenuImage } = mediaFilesStore.useMediaFile(
	grillsMenuImageReference
);
const accessoriesMenuImageReference = getData(
	'catalog_menu.accessories_menu.image'
);
const { mediaFile: accessoriesMenuImage } = mediaFilesStore.useMediaFile(
	accessoriesMenuImageReference
);

const saucesMenuImageReference = getData('catalog_menu.sauces_menu.image');
const { mediaFile: saucesMenuImage } = mediaFilesStore.useMediaFile(
	saucesMenuImageReference
);

const cylindersIgnitionMenuImageReference = getData(
	'catalog_menu.cylinders_ignition_menu.image'
);
const { mediaFile: cylindersIgnitionMenuImage } = mediaFilesStore.useMediaFile(
	cylindersIgnitionMenuImageReference
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
