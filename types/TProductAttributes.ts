export type TProductAttributeValue = {
	id: number;
	value: string;
};

export type TProductAttribute = {
	id: number;
	name: string;
	values: TProductAttributeValue[];
};

export type TProductAttributeGroup = {
	id: number;
	name: string;
	attributes: TProductAttribute[];
};
