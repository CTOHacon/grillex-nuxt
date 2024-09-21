<template>
	<AppLayout>
		<h1>This is blog</h1>
		<p>Page: {{ paged }}</p>
		<NuxtLink :to="getPagedPath(webPage.path, 1)">Go to page 1</NuxtLink>
		<NuxtLink :to="getPagedPath(webPage.path, 2)">Go to page 2</NuxtLink>
		<ul>
			<li v-for="post in webPage.data?.blogPosts" :key="post.id">
				<h2>{{ post.title }}</h2>
				<p>{{ post.content }}</p>
			</li>
		</ul>
	</AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '~/layouts/AppLayout.vue';
import type { TWebPage } from '~/types/TWebPage';

type TBlogPost = {
	id: string;
	title: string;
	content: string;
};

const paged = useState<number>('paged');
const webPage = useState<TWebPage<any, { blogPosts: TBlogPost[] }>>('webPage');
</script>

<style scoped></style>
