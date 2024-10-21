export type TBlock<Data = Record<string, any>> = {
    id: string;
    type: string;
    data: Data;
}