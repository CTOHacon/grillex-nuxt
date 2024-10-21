import type { TProductVariation } from "~/types/TProductVariation";
import { useApi } from "./API";
import type { TProductVariationForWebPage } from "~/types/TProductVariationForWebPage";


const productVariationService = {
    fetch: async <Ext>(id: number,
        params: Record<string, any> = {}
    ) => {
        const { api } = useApi();
        return api<TProductVariation & Ext>(`/product-variations/${id}`, {
            params,
            onRequest: () => {
                console.info('📥 Fetching product variation', id);
            }
        });
    },

    fetchForWebPage: async (webPageId: number) => {
        const { api } = useApi();
        return api<TProductVariationForWebPage>(`product-variations/${webPageId}/for-web-page`, {
            onRequest: () => {
                console.info('📥 Fetching product variations for web page', webPageId);
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