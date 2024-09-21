export interface ITabsControlItem<TKey = string> {
	title: string;
	key: TKey;
	counter?: number;
}
