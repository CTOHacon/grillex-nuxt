import type { TWebPage } from "./TWebPage";

export type TPost = {
    id: number;
    title: string;
    excerpt: string;
    thumbnail: string;
    web_page: TWebPage;
    created_at: string;
}