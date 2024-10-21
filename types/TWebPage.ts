import type { TWebPageSEO } from "./TWebPageSEO";
import type { TWebPageData } from "./TWebPageData";

export type TWebPage<TData = any> = {
	id: number;
	web_pageable_id: number;
	web_pageable_type: string;
	type: string;
	path: string;
	compiled_path: string;
	data: TWebPageData<TData>;
	seo: TWebPageSEO;
	title: string;
	breadcrumbs: {
		title: string;
		path: string;
	}[];
}

export type TLoadsWebPage = {
	web_page: TWebPage;
}