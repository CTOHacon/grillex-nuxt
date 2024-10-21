import { defineStore } from 'pinia';
import { ref } from 'vue';
import useMediaFilesStore from './useMediaFilesStore';
import useWebPageStore from './useWebPageStore';
import type { TPostCategory } from '~/types/TPostCategory';
import { fetchPostCategoriesIndex } from '~/service/fetchPostCategoriesIndex';

/**
 * Represents a store for managing web page resources.
 */
const usePostCategoriesIndexStore = defineStore('postCategoriesIndexStore', () => {
    const data = ref<TPostCategory[] | null>(null);
    const mediaFilesStore = useMediaFilesStore();

    const fetch = async () => {
        try {
            const response = await fetchPostCategoriesIndex();
            data.value = response;

            mediaFilesStore.addMediaFilesToLoad([response]);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error fetching PostCategoriesIndex:', error);
        }
    };

    return {
        data,
        fetch,
    };
});

export default usePostCategoriesIndexStore;
