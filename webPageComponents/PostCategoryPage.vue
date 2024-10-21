<template>
	<HeaderSpacer />
	<div class="container">
		<Breadcrumbs class="" />
	</div>
	<div class="post-category-page container mb-3">
		<SectionTitle size="3" tagname="h1">
			{{ postCategoryData?.name }}
		</SectionTitle>
		<BlogCategoriesNavigation class="mb-1-5" />
		<PostsIndex />
	</div>
</template>

<script setup lang="ts">
import BlogCategoriesNavigation from '~/components/BlogCategoriesNavigation.vue';
import PostsIndex from '~/components/PostsIndex.vue';
import SectionTitle from '~/components/SectionTitle.vue';
import usePostCategoryStore from '~/store/usePostCategoryStore';

const postCategory = usePostCategoryStore();
await postCategory.fetch();

const { data: postCategoryData } = storeToRefs(postCategory);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.post-category-page {
	padding: 3rem;
	background: #fff;
	gap: 1rem;
	@media (max-width: $mobile-width) {
		padding: 1rem;
	}
}
</style>
