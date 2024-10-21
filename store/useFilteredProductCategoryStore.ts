import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { TFilteredProductCategory } from '~/types/TFilteredProductCategory';
import useMediaFilesStore from './useMediaFilesStore';
import { fetchFilteredProductCategory } from '~/service/fetchFilteredProductCategory';

/**
 * Represents a store for managing web page resources.
 */
const useFilteredProductCategoryStore = defineStore('FilteredProductCategoryStore', () => {
    const data = ref<TFilteredProductCategory | null>(null);
    const mediaFilesStore = useMediaFilesStore();

    const fetch = async (
        id: number
    ) => {
        try {
            const response = await fetchFilteredProductCategory(
                id
            );
            data.value = response;

            mediaFilesStore.addMediaFilesToLoad([response.image]);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error fetching FilteredProductCategory:', error);
        }
    };

    const isProductFilterOptionAlwaysEnabled = (id: number) => {
        return !!data.value?.product_filter_options.find((option) => option.id === id);
    }

    return {
        data,
        isProductFilterOptionAlwaysEnabled,
        fetch,
    };
});

export default useFilteredProductCategoryStore;
