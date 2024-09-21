import type { TProductVariation } from "./TProductVariation";

export type TCartItem = {
    product_variation_id: number;
    product_variation?: TProductVariation;
    quantity: number;
    inGiftQuantity: number;
};
