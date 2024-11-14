import type { TProduct } from "./TProduct";
import type { TLoadsProductVariations } from "./TProductVariation";

export type TFavoritesItem = {
    product_id: number;
    product?: TProduct & TLoadsProductVariations;
};
