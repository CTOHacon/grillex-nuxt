<template>
	<BaseTabsControl
		@change="onChange"
		:items="tabs"
		:active-item="activeTab"
		class="blog-categories-navigation"
	/>
</template>

<script setup lang="ts">
import usePostCategoriesIndexStore from '~/store/usePostCategoriesIndexStore';
import BaseTabsControl from './BaseTabsControl.vue';
import type { TTabsControlItem } from '~/types/TTabsControlItem';
import usePostCategoryStore from '~/store/usePostCategoryStore';
const { t } = useI18n();

const postCategoriesIndex = usePostCategoriesIndexStore();
await postCategoriesIndex.fetch();

const { data: postCategoriesIndexData } = storeToRefs(postCategoriesIndex);

const tabs = ref<TTabsControlItem[]>([]);
tabs.value =
	postCategoriesIndexData.value?.map(item => ({
		key: `/${item.web_page.compiled_path}`,
		title: item.name
	})) || [];
tabs.value.unshift({
	key: '/blog',
	title: t('all')
});

const postCategoryStore = usePostCategoryStore();
const { data: postCategoryData } = storeToRefs(postCategoryStore);

const activeTab = computed(() => {
	return postCategoryData.value?.web_page.compiled_path || '/blog';
});

const onChange = (key: string) => {
	window.location.href = key;
};
</script>

<style scoped lang="scss">
.blog-categories-navigation {
	border-bottom: 0.0625rem solid #afbacc;
}
</style>
