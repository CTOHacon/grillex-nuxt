export type TProductAttributeOption = {
    id: number;
    name: string;
    sorting_order: number;
}

export type TLoadsProductAttributeOptions<With = any> = {
    product_attribute_options: (TProductAttributeOption & With)[];
}