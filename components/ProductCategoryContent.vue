<template>
	<div class="product-category-content">
		<div class="product-category-content__aside">
			<BaseFeaturedArticleSmallCard
				v-if="webPage?.data.data.featured_article"
				:title="webPage?.data.data.featured_article.title"
				:link="webPage?.data.data.featured_article.link"
				:text="webPage?.data.data.featured_article.text"
				:image="featuredArticleImage?.url || ''"
			/>
			<BaseTableOfContents
				:title="webPage?.title"
				:items="webPage?.data.data.table_of_contents"
				@item-click="() => (collapsedContentShouldBeVisible = true)"
			/>
		</div>
		<div class="product-category-content__main">
			<BaseCollapsibleContent
				class="product-category-content__main-text"
				:closed-height="250"
				v-if="webPage?.data.data.content"
			>
				<div
					class="typography-content"
					v-html="webPage?.data.data.content"
				/>
			</BaseCollapsibleContent>
			<BaseFeaturedArticleLargeCard
				v-if="webPage?.data.data.banner"
				:title="webPage?.data.data.banner.title"
				:text="webPage?.data.data.banner.text"
				:image="bannerImage?.url || ''"
				:link="webPage?.data.data.banner.link"
				theme="dark"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import BaseCollapsibleContent from '~/components/BaseCollapsibleContent.vue';
import useWebPageStore from '~/store/useWebPageStore';
import BaseTableOfContents from './BaseTableOfContents.vue';
import BaseFeaturedArticleSmallCard from './BaseFeaturedArticleSmallCard.vue';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import BaseFeaturedArticleLargeCard from './BaseFeaturedArticleLargeCard.vue';

// This is a workaround to make the content visible when the user clicks on the table of contents
const collapsedContentShouldBeVisible = ref(false);
provide('collapsedContentShouldBeVisible', collapsedContentShouldBeVisible);

const webPageStore = useWebPageStore();
const { data: webPage } = storeToRefs(webPageStore);

const { useMediaFile } = useMediaFilesStore();

const { mediaFile: featuredArticleImage } = useMediaFile(
	webPage.value?.data.data?.featured_article?.image
);

const { mediaFile: bannerImage } = useMediaFile(
	webPage.value?.data.data?.banner?.image
);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-category-content {
	display: grid;
	grid-template-columns: 27.375rem 1fr;
	gap: 2.0625rem;
	@media (max-width: $tablet-width) {
		grid-template-columns: 1fr;
		gap: 1rem;
		padding: 1rem;
	}
}

.product-category-content__main-text {
	padding-left: 4.0625rem;
	padding-top: 1rem;
	margin-bottom: 5.625rem;
	padding-right: 8.25rem;
	@media (max-width: $tablet-width) {
		padding-left: 0;
		padding-right: 0;
	}
}

.product-category-content__aside {
	padding: 0 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	@media (max-width: $tablet-width) {
		padding: 0;
	}
}
</style>
