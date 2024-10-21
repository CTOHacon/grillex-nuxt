import type { TProductAdvantage } from "./TProductAdvantage";
import type { TProductTechnologicalFeature } from "./TProductTechnologicalFeature";

type TProductGeneralCharacteristic = {
    title: string;
    description: string;
}

export type TProductFullInfo = {
    id: number;
    brand_logo: string;
    short_description: string;
    full_description: string;
    technological_characteristics_image: string;
    general_characteristics: TProductGeneralCharacteristic[];
    product_advantages: TProductAdvantage[];
    product_technological_features: TProductTechnologicalFeature[];
    product_id: number;
}

export type TLoadsProductFullInfo<Key extends string = 'product_full_info'> = {
    [K in Key]: TProductFullInfo;
}