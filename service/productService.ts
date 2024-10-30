import type { TProduct } from "~/types/TProduct";
import { useApi } from "./API";
import type { TLoadsProductVariations } from "~/types/TProductVariation";
import type { TPaginated } from "~/types/TPaginated";

const productService = {
    fetch: async (id: number) => {
        if (!id) return null;
        const { api } = useApi();
        return api<TProduct & TLoadsProductVariations>(`/products/${id}`, {
            params: {
                'with': 'productVariations'
            },
        });
    },
    fetchPortion: async (queryParams: {
        is_new?: boolean,
        is_bestseller?: boolean,
        is_featured?: boolean,
    }) => {
        const { api } = useApi();

        const params: any = {
            with: 'productVariations',
            'published_only': true
        }
        if (queryParams.is_new !== undefined) params['where[is_new]'] = Number(queryParams.is_new);
        if (queryParams.is_bestseller !== undefined) params['where[is_bestseller]'] = Number(queryParams.is_bestseller);
        if (queryParams.is_featured !== undefined) params['where[is_featured]'] = Number(queryParams.is_featured);

        const response = await api<TPaginated<TProduct & TLoadsProductVariations>>(`/products`, {
            params
        });

        return response.data;
    },
    fetchSelection: async (ids: number[]) => {
        const { api } = useApi();
        return api<(TProduct & TLoadsProductVariations)[]>(`/products/selection/${ids.join(',')}`, {
            params: {
                'with': 'productVariations'
            },
            onRequest: () => {
                console.info('📥 Fetching product selection');
            }
        });
    },
    search: async (query: string) => {
        const { api } = useApi();
        return api<(TProduct & TLoadsProductVariations)[]>(`/products/search`, {
            params: {
                query,
                'with': 'productVariations'
            },
            onRequest: () => {
                console.info('📥 Fetching search result');
            }
        });
    }
}

export default productService;