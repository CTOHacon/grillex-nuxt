import type { TWebPage } from "~/types/TWebPage";
import { useApi } from "./API";

export const fetchWebPage = async () => {
    const { api } = useApi();
    const path = useWebPagePath();
    const paged = usePaged();

    return api<TWebPage>(`/web-pages/${path.value}`, {
        query: {
            paged: paged.value,
            with: 'seo,data'
        },
        onRequest: () => {
            console.info('📥 Fetching web page ', path.value);
        }
    });
}