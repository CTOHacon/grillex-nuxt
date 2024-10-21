import type { TPostCategory } from "~/types/TPostCategory";
import { useApi } from "./API";

export const fetchPostCategory = async (id: number) => {
    const { api } = useApi();

    return api<TPostCategory>(`/post-categories/${id}`, {
        query: {
        },
        onRequest: () => {
            console.info('📥 Fetching post category', id);
        }
    });
}