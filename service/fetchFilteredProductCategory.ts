import { useApi } from "./API";
import type { TFilteredProductCategory } from "~/types/TFilteredProductCategory";

export const fetchFilteredProductCategory = async (id: number) => {
    const { api } = useApi();

    return api<TFilteredProductCategory>(`/filtered-product-categories/${id}`, {
        query: {
        },
        onRequest: () => {
            console.info('📥 Fetching filtered-product-category', id);
        }
    });
}