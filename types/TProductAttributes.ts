export type TProductAttribute = {
	id: number;
	name: string;
	sorting_order: number;
	product_attribute_options_count?: number;
}

export type TLoadsProductAttribute<With> = {
	product_attribute: TProductAttribute & With;
}

export type TLoadsProductAttributes<With> = {
	product_attributes: (TProductAttribute & With)[];
}