import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { TPost } from '~/types/TPost';
import { useApi } from '~/service/API';
import useMediaFilesStore from './useMediaFilesStore';
import type { TPaginated } from '~/types/TPaginated';

const usePostsArchiveStore = defineStore('postsArchiveStore', () => {
    const data = ref<TPaginated<TPost> | null>(null);
    const postCategoryId = ref<number | null>(null);
    const isLoading = ref(false);
    const mediaFilesStore = useMediaFilesStore();
    const { api } = useApi();
    const paged = usePaged();

    const fetch = async () => {
        isLoading.value = true;
        try {
            const response = await api<TPaginated<TPost>>(`/posts/archive`, {
                params: {
                    page: paged.value,
                    perPage: 8,
                    post_category_id: postCategoryId.value,
                },
                onRequest: () => {
                    console.info('📥 Fetching posts');
                },
            });
            data.value = response;

            mediaFilesStore.addMediaFilesToLoad(response.data.map(post => post.thumbnail));
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        data,
        postCategoryId,
        isLoading,
        fetch,
    };
});

export default usePostsArchiveStore;