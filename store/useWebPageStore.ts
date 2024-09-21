import { defineStore } from 'pinia'
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
            const respone = await fetchWebPage();
            data.value = respone;

            mediaFilesStore.addMediaFilesToLoad([respone.data, respone?.seo?.og_image]);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error fetching WebPage:', error);
        }
    }

    return {
        data,
        fetch
    };
})

export default useWebPageStore;
