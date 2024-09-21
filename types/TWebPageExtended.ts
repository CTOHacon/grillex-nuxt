import type { TWebPage } from "./TWebPage";

export type TWebPageExtended<
    TExtension,
    TData,
    TWebPageable
> = TExtension extends
    TWebPage<TData, TWebPageable>
    ? TExtension
    : TWebPage<TData, TWebPageable>;