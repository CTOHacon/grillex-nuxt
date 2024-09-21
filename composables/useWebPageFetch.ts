import { useApi } from "~/service/API";
import type { TWebPage } from "~/types/TWebPage";


export const useWebPageFetch = () => {
	const { apiSS } = useApi();
	const path = useWebPagePath();
	const paged = usePaged();

	const fetchInstance = apiSS<TWebPage>(`/web-pages/${path.value}`, {
		query: {
			paged: paged.value,
			with: 'seo,data'
		},
		onRequest: () => {
			console.info('📥 Fetching WebPage');
		}
	})


	return fetchInstance;
}
