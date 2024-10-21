import { defineStore } from 'pinia'
import useMediaFilesStore from './useMediaFilesStore';
import { useApi } from '~/service/API';
import type { TGlobalSettings } from '~/types/TGlobalSettings';

/**
 * Represents a store for managing web page resources.
 */
const useGlobalSettingsStore = defineStore('globalSettingsStore', () => {
    const data = ref<any | null>(null);
    const mediaFilesStore = useMediaFilesStore();
    const { api } = useApi();

    const fetch = async () => {
        console.info('📥 Loading global settings');
        try {
            const response = await api<TGlobalSettings>(`/global-settings/keyValueIndex`);
            data.value = response;

            mediaFilesStore.addMediaFilesToLoad(response);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error loading global settings:', error);
        }
    }

    // get the data item by key which is a string of key.key.key... etc
    const getData = <T = any>(key: string) => {
        return computed<T | null>(() => {
            let result = data.value;
            return safeObjectDataGetter(result, key);
        });
    };

    return {
        data,
        fetch,
        getData
    };
})

export default useGlobalSettingsStore;
