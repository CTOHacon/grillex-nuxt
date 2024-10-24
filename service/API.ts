import type { Ref } from 'vue';
import useLocaleStore from '~/store/useLocaleStore';

const tokenKey = 'tok';
const backendBase = 'http://127.0.0.1:8000';
const appApiBase = '/api';

type TAPIOptions = {
    locale?: Ref<string> | string;
    apiBase?: string;
    translated?: boolean;
};

export const useApi = (options: TAPIOptions = {}) => {
    const localeStore = useLocaleStore();

    const {
        apiBase = appApiBase,
        translated = true
    } = options;

    const baseURL = `${backendBase}/${apiBase}`.replace(/([^:]\/)\/+/g, '$1');

    // useCookie for token in future
    let token = '';
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem(tokenKey) || '';
    }

    const params: any = {};
    if (!translated) params.skipTranslation = true;

    const combineWithCriticalFetchOptions = (options: any) => {
        return {
            baseURL,
            credentials: 'include' as RequestCredentials,
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Accept-Language': localeStore.locale,
                Authorization: `Bearer ${token}`,
                ...options?.headers,
            },
            params: {
                ...params,
                ...options?.params,
            },
        };
    }

    const api = <ReturnData>(
        request: Parameters<typeof $fetch>[0],
        options: Parameters<typeof $fetch>[1] = {}
    ) => {
        return $fetch<ReturnData>(request, combineWithCriticalFetchOptions(options));
    };

    const apiSS = <ReturnData>(
        request: Parameters<typeof useFetch>[0],
        options: Parameters<typeof useFetch>[1] = {}
    ) => {
        return useFetch<ReturnData>(
            request,
            combineWithCriticalFetchOptions(options)
        );
    }

    return { api, apiSS };
};