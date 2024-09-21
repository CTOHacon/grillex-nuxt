import type { TProductVariation } from "~/types/TProductVariation";
import { useApi } from "./API";


const productVariationService = {
    fetch: async (id: number) => {
        const { api } = useApi();
        return api<TProductVariation>(`/product-variations/${id}`, {
            onRequest: () => {
                console.info('📥 Fetching product variation', id);
            }
        });
    },
    fetchSelection: async (ids: number[]) => {
        const { api } = useApi();
        return api<TProductVariation[]>(`/product-variations/selection/${ids.join(',')}`, {
            onRequest: () => {
                console.info('📥 Fetching product variations selection');
            }
        });
    }
}

export default productVariationService;