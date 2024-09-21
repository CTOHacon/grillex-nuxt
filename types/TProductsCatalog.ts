import type { TPaginated } from "./TPaginated"
import type { TProduct } from "./TProduct";
import type { TProductCategory } from "./TProductCategory";
import type { TProductFilter } from "./TProductFilter";
import type { TProductFilterOption } from "./TProductFilterOption";
import type { TLoadsProductVariations } from "./TProductVariation";

export type TProductsCatalog = {
    products: TPaginated<TProduct
        & TLoadsProductVariations
    >;
    minPrice: number;
    maxPrice: number;
    product_category: TProductCategory & {
        product_filters: (TProductFilter & {
            product_filter_options: TProductFilterOption[];
        })[];
    };
}