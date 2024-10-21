import type { TPostCategory } from "~/types/TPostCategory";
import { useApi } from "./API";

export const fetchPostCategoriesIndex = async () => {
    const { api } = useApi();

    return api<TPostCategory[]>(`/post-categories`, {
        query: {
        },
        onRequest: () => {
            console.info('📥 Fetching post categories index');
        }
    });
}