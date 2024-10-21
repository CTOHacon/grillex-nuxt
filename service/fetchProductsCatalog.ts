import useProductsCatalogFilteringStore from "~/store/useProductsCatalogFilteringStore";
import { useApi } from "./API";
import useWebPageStore from "~/store/useWebPageStore";
import type { TProductsCatalog } from "~/types/TProductsCatalog";
import useFilteredProductCategoryStore from "~/store/useFilteredProductCategoryStore";

export const fetchProductsCatalog = async () => {
    const { api } = useApi();
    const filteredProductCategoryStore = useFilteredProductCategoryStore();

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
        const webPageType = webPageStore.data?.web_pageable_type ?? '';
        if (webPageType.includes('FilteredProductCategory')) return filteredProductCategoryStore.data?.product_category_id;
        else if (webPageType.includes('ProductCategory')) return webPageStore.data?.web_pageable_id;
        return null;
    });

    return api<TProductsCatalog>(`/products/catalog`, {
        params: {
            perPage: perPage,
            sorting: sorting,
            priceStart: priceStart,
            priceEnd: priceEnd,
            "appliedProductFilterOptions[]": Array.from(appliedProductFilterOptions),
            paged: paged.value,
            productCategoryId: productCategoryId.value,
        },
        onRequest: () => {
            console.info('📥 Fetching products catalog');
        },
    });
}