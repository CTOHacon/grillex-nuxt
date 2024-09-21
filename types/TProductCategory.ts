import type { TWebPage } from "./TWebPage"

export type TProductCategory = {
    id: number;
    name: string;
    image: null | string;
    parent_id: null | number;
    created_at: string;
    updated_at: string;
    web_page: TWebPage;
}