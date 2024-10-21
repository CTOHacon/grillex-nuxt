import type { TProduct } from "./TProduct";

export type TLoadsProduct<ProductLoads = any> = {
    product: TProduct & ProductLoads;
}