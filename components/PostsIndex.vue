<template>
	<div class="posts-index" v-if="postsIndexData">
		<BlogPostCard
			v-for="post in postsIndexData.data"
			:key="post.id"
			:post="post"
		/>
	</div>
</template>

<script setup lang="ts">
import usePostCategoryStore from '~/store/usePostCategoryStore';
import usePostsArchiveStore from '~/store/usePostsArchiveStore';
import BlogPostCard from './BlogPostCard.vue';

const postCategory = usePostCategoryStore();

const postsIndex = usePostsArchiveStore();
if (postCategory.data) postsIndex.postCategoryId = postCategory.data.id;

await postsIndex.fetch();

const { data: postsIndexData } = storeToRefs(postsIndex);
</script>

<style scoped lang="scss">
.posts-index {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	gap: 1rem;
}
</style>
