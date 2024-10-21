import { defineStore } from 'pinia';
import { ref } from 'vue';
import useMediaFilesStore from './useMediaFilesStore';
import useWebPageStore from './useWebPageStore';
import type { TPostCategory } from '~/types/TPostCategory';
import { fetchPostCategory } from '~/service/fetchPostCategory';

/**
 * Represents a store for managing web page resources.
 */
const usePostCategoryStore = defineStore('postCategoryStore', () => {
    const data = ref<TPostCategory | null>(null);
    const webPage = useWebPageStore();
    const mediaFilesStore = useMediaFilesStore();

    const fetch = async () => {
        if (!webPage.data?.web_pageable_id) return;
        try {
            const response = await fetchPostCategory(webPage.data?.web_pageable_id);
            data.value = response;

            mediaFilesStore.addMediaFilesToLoad([response]);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error fetching PostCategory:', error);
        }
    };

    return {
        data,
        fetch,
    };
});

export default usePostCategoryStore;
