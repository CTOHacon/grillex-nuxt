import useProductsCatalogFilteringStore from "~/store/useProductsCatalogFilteringStore";
import { useApi } from "./API";
import useWebPageStore from "~/store/useWebPageStore";
import type { TProductsCatalog } from "~/types/TProductsCatalog";

export const fetchProductsCatalog = async () => {
    const { api } = useApi();

    // ! loose reactivity ! //
    const {
        perPage,
        sorting,
        priceStart,
        priceEnd,
        appliedProductFilterOptions
    } = useProductsCatalogFilteringStore();

    const webPageStore = useWebPageStore();
    const paged = usePaged();

    const productCategoryId = computed(() => {
        if (webPageStore.data?.web_pageable_type.includes('ProductCategory')) return webPageStore.data?.web_pageable_id;
        return null;
    });


    return api<TProductsCatalog>(`/products/catalog`, {
        params: {
            perPage: perPage,
            sorting: sorting,
            priceStart: priceStart,
            priceEnd: priceEnd,
            "appliedProductFilterOptions[]": [...appliedProductFilterOptions],
            paged: paged.value,
            productCategoryId: productCategoryId.value,
        },
        onResponse: (response) => { },
        onRequest: () => {
            console.info('📥 Fetching products catalog');
        },
    });
}