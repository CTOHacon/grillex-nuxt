<template>
	<a class="blog-post-card" :href="`/${post.web_page.compiled_path}`">
		<article class="blog-post-card__inner">
			<div class="blog-post-card__image-container">
				<img
					v-if="mediaFile"
					:src="getSizeUrl('thumbnail')"
					:alt="post.title"
					width="300"
					height="300"
				/>
			</div>
			<div class="blog-post-card__main">
				<h3 class="blog-post-card__title">
					{{ post.title }}
				</h3>
				<p class="blog-post-card__bottom">
					<span class="blog-post-card__details">
						{{ $t('details') }}
					</span>
					<span class="blog-post-card__date">
						{{
							new Date(post.created_at).toLocaleDateString(
								'en-GB',
								{
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								}
							)
						}}
					</span>
				</p>
			</div>
		</article>
	</a>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import type { TPost } from '~/types/TPost';

const props = defineProps<{
	post: TPost;
}>();

const mediaFilesStore = useMediaFilesStore();
const { mediaFile, getSizeUrl } = mediaFilesStore.useMediaFile(
	props.post.thumbnail
);
</script>

<style scoped lang="scss">
.blog-post-card {
	text-decoration: none;
	&__inner {
	}
	&__image-container {
		width: 100%;
		height: 20rem;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s;
		}
	}
	&:hover img {
		transform: scale(1.1);
	}
	&__title {
		font-weight: 700;
		font-size: 1.125rem;
		line-height: 111%;
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
	}
	&__main {
		padding: 0.75rem 1rem;
	}
	&__bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&__details {
		font-weight: 600;
		font-size: 1.125rem;
		line-height: 111%;
	}
	&__date {
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: #80868e;
	}
}
</style>
