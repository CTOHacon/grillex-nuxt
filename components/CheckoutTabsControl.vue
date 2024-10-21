<template>
	<BaseTabsControl
		:items="items"
		:active-item="currentTab"
		@change="onChange"
	/>
</template>

<script setup lang="ts">
import type { TTabsControlItem } from '@/types/TTabsControlItem';
import { onMounted, onUnmounted, ref } from 'vue';
import BaseTabsControl from './BaseTabsControl.vue';

const { t } = useI18n();

// Доставка Спосіб оплати Інформація про отримувача Підтвердження
const items: TTabsControlItem[] = [
	{
		title: t('shipping'),
		key: 'shipping'
	},
	{
		title: t('payment_methods'),
		key: 'payment'
	},
	{
		title: t('information_about_receiver'),
		key: 'recipient'
	},
	{
		title: t('submission'),
		key: 'confirmation'
	}
];

const currentTab = ref('shipping');
const tabNodes = ref<HTMLElement[]>([]);

const scrollListener = () => {
	const newActiveTab = findClosestToViewportCenterNode(tabNodes.value).id;
	if (newActiveTab !== currentTab.value) {
		currentTab.value = newActiveTab;
	}
};

onMounted(() => {
	tabNodes.value = items
		.map(item => document.getElementById(item.key))
		.filter(Boolean) as HTMLElement[];

	window.addEventListener('scroll', scrollListener);
});
onUnmounted(() => {
	window.removeEventListener('scroll', scrollListener);
});

const onChange = (value: string) => {
	const currentTabNode = document.getElementById(value);

	if (currentTabNode) {
		window.location.hash = value;
	}
};
</script>

<style scoped></style>
