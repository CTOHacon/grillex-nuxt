import type { TLoadsProduct } from "./TLoadsProduct";
import type { TLoadsProductAttributeOptions } from "./TProductAttributeOption";
import type { TProductAttribute } from "./TProductAttributes";
import type { TLoadsProductFullInfo, TProductFullInfo } from "./TProductFullInfo";
import type { TLoadsProductVariations, TProductVariation } from "./TProductVariation";

export type TProductVariationForWebPage = TProductVariation & TLoadsProductAttributeOptions<TProductAttribute> &
    TLoadsProduct<TLoadsProductVariations<TLoadsProductAttributeOptions> & TLoadsProductFullInfo>;