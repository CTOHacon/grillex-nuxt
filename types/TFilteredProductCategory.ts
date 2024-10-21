import type { TLoadsProductFilterOptions } from "./TLoadsProductFilterOptions";
import type { TWebPage } from "./TWebPage";

export type TFilteredProductCategory = {
    id: number;
    name: string;
    image: null | string;
    product_category_id: number;
    created_at: string;
    updated_at: string;
    web_page: TWebPage;
} & TLoadsProductFilterOptions;
