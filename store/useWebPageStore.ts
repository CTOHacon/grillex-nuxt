import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import { fetchWebPage } from '~/service/fetchWebPage';
import type { TWebPage } from '~/types/TWebPage';
import useMediaFilesStore from './useMediaFilesStore';

/**
 * Represents a store for managing web page resources.
 */
const useWebPageStore = defineStore('webPageStore', () => {
    const data = ref<TWebPage | null>(null);
    const mediaFilesStore = useMediaFilesStore();

    const fetch = async () => {
        try {
            const response = await fetchWebPage();
            data.value = response;

            mediaFilesStore.addMediaFilesToLoad([response.data, response?.seo?.og_image]);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error fetching WebPage:', error);
        }
    };

    // get the data item by key which is a string of key.key.key... etc
    const getData = <T = any>(key: string) => {
        return computed<T | null>(() => {
            let result = data.value?.data?.data;
            return safeObjectDataGetter(result, key);
        });
    };

    return {
        data,
        fetch,
        getData,
    };
});

export default useWebPageStore;
