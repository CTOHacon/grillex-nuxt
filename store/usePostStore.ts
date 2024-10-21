import { defineStore } from 'pinia';
import { ref } from 'vue';
import useMediaFilesStore from './useMediaFilesStore';
import useWebPageStore from './useWebPageStore';
import type { TPost } from '~/types/TPost';
import { fetchPost } from '~/service/fetchPost';

/**
 * Represents a store for managing web page resources.
 */
const usePostStore = defineStore('postStore', () => {
    const data = ref<TPost | null>(null);
    const webPage = useWebPageStore();
    const mediaFilesStore = useMediaFilesStore();

    const fetch = async () => {
        if (!webPage.data?.web_pageable_id) return;
        try {
            const response = await fetchPost(webPage.data?.web_pageable_id);
            data.value = response;

            mediaFilesStore.addMediaFilesToLoad([response]);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error fetching Post:', error);
        }
    };

    return {
        data,
        fetch,
    };
});

export default usePostStore;
