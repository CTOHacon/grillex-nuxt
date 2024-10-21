import type { TPost } from "~/types/TPost";
import { useApi } from "./API";

export const fetchPost = async (id: number) => {
    const { api } = useApi();

    return api<TPost>(`/posts/${id}`, {
        query: {
        },
        onRequest: () => {
            console.info('📥 Fetching post', id);
        }
    });
}