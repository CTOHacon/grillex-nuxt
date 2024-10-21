<template>
	<div class="product-category-content">
		<div class="product-category-content__aside">
			<BaseFeaturedArticleSmallCard
				v-if="featuredArticleTitle || featuredArticleText"
				:title="featuredArticleTitle"
				:link="featuredArticleLink"
				:text="featuredArticleText"
				:image="featuredArticleImage?.url || ''"
			/>
			<BaseTableOfContents
				v-if="tableOfContents && Array.isArray(tableOfContents)"
				:title="webPage?.title"
				:items="tableOfContents"
				@item-click="() => (collapsedContentShouldBeVisible = true)"
			/>
		</div>
		<div class="product-category-content__main">
			<BaseCollapsibleContent
				class="product-category-content__main-text"
				:closed-height="250"
				v-if="content"
			>
				<div class="typography-content" v-html="content" />
			</BaseCollapsibleContent>
			<BaseFeaturedArticleLargeCard
				v-if="bannerTitle || bannerText"
				:title="bannerTitle"
				:text="bannerText"
				:image="bannerImage?.url || ''"
				:link="bannerLink"
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

const collapsedContentShouldBeVisible = ref(false);
provide('collapsedContentShouldBeVisible', collapsedContentShouldBeVisible);

const webPageStore = useWebPageStore();
const getData = webPageStore.getData;
const { data: webPage } = storeToRefs(webPageStore);

const { useMediaFile } = useMediaFilesStore();

const featuredArticleTitle = getData('featured_article.title');
const featuredArticleLink = getData('featured_article.link');
const featuredArticleText = getData('featured_article.text');
const featuredArticleImageReference = getData('featured_article.image');
const { mediaFile: featuredArticleImage } = useMediaFile(
	featuredArticleImageReference
);

const tableOfContents = getData('table_of_contents');

const content = getData('content');

const bannerTitle = getData('banner.title');
const bannerText = getData('banner.text');
const bannerLink = getData('banner.link');
const bannerImageReference = getData('banner.image');
const { mediaFile: bannerImage } = useMediaFile(bannerImageReference);
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
