import { defineStore } from 'pinia'
import type { TProductsCatalog } from '~/types/TProductsCatalog';
import { useApi } from '~/service/API';
import useMediaFilesStore from './useMediaFilesStore';

const useProductsSearchStore = defineStore('productsSearchStore', () => {

    const searchResult = ref<TProductsCatalog>();
    const isLoading = ref(false);
    const mediaFilesStore = useMediaFilesStore();
    const { api } = useApi();

    const search = async (query: string) => {
        if (query.length < 3) return;
        isLoading.value = true;
        try {
            searchResult.value = await api<TProductsCatalog>(`/products/catalog`, {
                params: {
                    search: query,
                    perPage: 10,
                    paged: 1,
                },
                onRequest: () => {
                    console.info('📥 Fetching products catalog');
                },
            });
            mediaFilesStore.addMediaFilesToLoad(searchResult.value.products.data);
            await mediaFilesStore.loadMediaFiles();
            isLoading.value = false;
        } catch (error) {
            alert('Error fetching search result');
            console.error('Error fetching search result:', error);
        }
    };

    return {
        searchResult,
        isLoading,
        search,
    }
})

export default useProductsSearchStore; 
