import stringify from "fast-stringify";
import { useApi } from "~/service/API";
import type { TMediaFile, TMediaFileSizeKey } from "~/types/TMediaFile";

const useMediaFilesStore = defineStore('mediaFilesStore', () => {
    const { api } = useApi();

    const shortcodeRegexp = /\[MediaFile id=(\\?["\\])(\d+)\1\]/g;
    const extractMediaFileIds = (content: string | object): number[] => {
        if (typeof content === 'object') content = stringify(content);
        const ids: number[] = [];
        let match: RegExpExecArray | null;
        while ((match = shortcodeRegexp.exec(content)) !== null) {
            ids.push(parseInt(match[2]));
        }
        return ids;
    }

    const mediaFiles = ref<TMediaFile[]>([]);
    const mediaFilesToLoad = ref<number[]>([]);
    const isMediaFileIdStored = (id: number) => {
        return mediaFiles.value.some(mediaFile => mediaFile.id === id) || mediaFilesToLoad.value.includes(id);
    }

    const addMediaFilesToLoad = (source: string | string[] | number | number[] | object) => {
        if (Array.isArray(source)) {
            source.forEach(item => addMediaFilesToLoad(item));
        } else if (typeof source === 'string' || typeof source === 'object') {
            const ids = extractMediaFileIds(source);
            ids.forEach(id => addMediaFilesToLoad(id));
        } else {
            if (!isMediaFileIdStored(source)) {
                mediaFilesToLoad.value.push(source);
            }
        }
    }

    const loadMediaFiles = async () => {
        try {
            if (!mediaFilesToLoad.value || !mediaFilesToLoad.value.length) return;
            console.info('📥 Loading media files:', mediaFilesToLoad.value);
            const response = await api<TMediaFile[]>(`/media-files/selection/${mediaFilesToLoad.value.join(',')}`, {
                params: {
                    ignoreOrder: true
                }
            });

            mediaFiles.value.push(...response);
            mediaFilesToLoad.value = [];
        } catch (error) {
            console.error('Error loading media files:', error);
        }
    }

    const getMediaFile = (reference: string | number): TMediaFile | null => {
        if (typeof reference === 'number') {
            return mediaFiles.value.find(mediaFile => mediaFile.id === reference) || null;
        } else {
            const ids = extractMediaFileIds(reference);
            return mediaFiles.value.find(mediaFile => ids.includes(mediaFile.id)) || null;
        }
    }

    type TMediaFileReference = string | number | undefined;
    const useMediaFile = (sourceReference: TMediaFileReference | Ref<TMediaFileReference>) => {
        const reference = isRef(sourceReference) ? sourceReference : ref(sourceReference);

        const mediaFile = computed(() => {
            if (!reference.value) return null;

            if (typeof reference.value === 'number') {
                return mediaFiles.value.find(mediaFile => mediaFile.id === reference.value) || null;
            } else {
                const ids = extractMediaFileIds(reference.value);
                return mediaFiles.value.find(mediaFile => ids.includes(mediaFile.id)) || null;
            }
        });
        const updateReference = (newReference: string | number | undefined) => {
            reference.value = newReference;
        }

        const getSizeUrl = (size: TMediaFileSizeKey) => {
            if (!mediaFile.value) return '';
            if (mediaFile.value.sizes && mediaFile.value.sizes[size]) {
                return mediaFile.value.sizes[size].url;
            }
            return mediaFile.value.url;
        }

        return {
            mediaFile,
            updateReference,
            getSizeUrl
        };
    }

    return {
        mediaFiles,
        addMediaFilesToLoad,
        loadMediaFiles,
        useMediaFile,
        getMediaFile
    };
});

export default useMediaFilesStore;