<template>
	<AppLayout>
		<HeaderSpacer />
		<div class="container">
			<Breadcrumbs
				class=""
				:breadcrumbs="[
					{
						title: $t('blog'),
						path: '/blog'
					}
				]"
			/>
		</div>
		<div class="post-category-page container mb-3">
			<SectionTitle size="3" tagname="h1">
				{{ $t('blog') }}
			</SectionTitle>
			<BlogCategoriesNavigation class="mb-1-5" />
			<PostsIndex />
		</div>
	</AppLayout>
</template>

<script setup lang="ts">
import BlogCategoriesNavigation from '~/components/BlogCategoriesNavigation.vue';
import PostsIndex from '~/components/PostsIndex.vue';
import SectionTitle from '~/components/SectionTitle.vue';
import AppLayout from '~/layouts/AppLayout.vue';

const { t } = useI18n();
useHead({
	title: t('blog')
});
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
