import type { TProduct } from "./TProduct";
import type { TWebPage } from "./TWebPage";

export type TProductVariation = {
    id: number;
    product_id: number;
    sku: string;
    stock: number;
    price: number;
    name: string;
    images: string[];
    created_at: string;
    updated_at: string;
    web_page: TWebPage;
}

export type TLoadsProductVariations<With = any> = {
    product_variations: (TProductVariation & With)[];
}