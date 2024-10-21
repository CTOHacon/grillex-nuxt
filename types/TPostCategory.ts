import type { TLoadsWebPage } from "./TWebPage";

export type TPostCategory = {
    id: number;
    name: string;
    image: string;
} & TLoadsWebPage;