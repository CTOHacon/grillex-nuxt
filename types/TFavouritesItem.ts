import type { TLoadsProductFilterOptions } from "./TLoadsProductFilterOptions";
import type { TProduct } from "./TProduct";
import type { TLoadsProductVariations } from "./TProductVariation";

export type TFavouritesItem = {
    product_id: number;
    product?: TProduct & TLoadsProductVariations;
};
