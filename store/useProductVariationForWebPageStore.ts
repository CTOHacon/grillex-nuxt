import { defineStore } from 'pinia';
import { ref } from 'vue';
import useMediaFilesStore from './useMediaFilesStore';
import productVariationService from '~/service/productVariationService';
import useWebPageStore from './useWebPageStore';
import type { TProductVariationForWebPage } from '~/types/TProductVariationForWebPage';
import type { TProductVariation } from '~/types/TProductVariation';

/**
 * Represents a store for managing web page resources.
 */
const useProductVariationForWebPageStore = defineStore('productVariationForWebPageStore', () => {
    const data = ref<TProductVariationForWebPage | null>(null);
    const webPage = useWebPageStore();
    const mediaFilesStore = useMediaFilesStore();

    const fetch = async () => {
        if (!webPage.data?.web_pageable_id) return;
        try {
            const response = await productVariationService.fetchForWebPage(webPage.data?.web_pageable_id);
            data.value = response;

            mediaFilesStore.addMediaFilesToLoad([response]);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error fetching ProductVariation:', error);
        }
    };

    return {
        data,
        fetch,
    };
});

export default useProductVariationForWebPageStore;
