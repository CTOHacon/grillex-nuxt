import { defineStore } from 'pinia'
import useMediaFilesStore from './useMediaFilesStore';
import { useApi } from '~/service/API';
import type { TGlobalSettings } from '~/types/TGlobalSettings';
import useLocaleStore from './useLocaleStore';
import i18nConfig from '~/i18n.config';

/**
 * Represents a store for managing web page resources.
 */
const useGlobalSettingsStore = defineStore('globalSettingsStore', () => {
    const data = ref<any | null>(null);
    const mediaFilesStore = useMediaFilesStore();
    const { api } = useApi();
    const { locale } = useI18n();


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

    return {
        data,
        fetch
    };
})

export default useGlobalSettingsStore;
