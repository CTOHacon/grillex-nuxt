import { defineStore } from 'pinia'
import type { TProductsCatalog } from '~/types/TProductsCatalog';
import useProductsCatalogFilteringStore from './useProductsCatalogFilteringStore';
import { fetchProductsCatalog } from '~/service/fetchProductsCatalog';
import useMediaFilesStore from './useMediaFilesStore';

const useProductsCatalogStore = defineStore('productsCatalogIndexStore', () => {
	const data = ref<TProductsCatalog | null>(null);
	const mediaFilesStore = useMediaFilesStore();
	const filteringStore = useProductsCatalogFilteringStore();

	const fetch = async () => {
		try {
			const response = await fetchProductsCatalog();
			data.value = response;

			mediaFilesStore.addMediaFilesToLoad(response.products.data);
			await mediaFilesStore.loadMediaFiles();

			filteringStore.setupPriceRangeLimits(response.minPrice, response.maxPrice);
		} catch (error) {
			console.error('Error fetching products catalog:', error);
		}
	}

	watch([
		() => filteringStore.perPage,
		() => filteringStore.sorting,
	], () => {
		console.log('Fetching products catalog due to filtering change');
		fetch();
	});

	return {
		data,
		fetch
	};
});

export default useProductsCatalogStore;