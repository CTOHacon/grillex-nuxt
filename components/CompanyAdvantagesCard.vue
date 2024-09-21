<template>
	<li class="company-advantages-card">
		<h4 class="company-advantages-card__title">
			<span v-html="title" />
			<img
				v-if="mediaFile"
				:src="mediaFile.url"
				:alt="htmlTagsDestroyer(title)"
				width="32"
				height="32"
				loading="lazy"
			/>
		</h4>
		<p class="fs-1-125 lh-133" v-html="description" />
	</li>
</template>

<script setup lang="ts">
import htmlTagsDestroyer from '@/utils/htmlTagsDestroyer';
import useMediaFilesStore from '~/store/useMediaFilesStore';
const props = defineProps<{
	icon: string;
	title: string;
	description: string;
}>();

const mediaFilesStore = useMediaFilesStore();
const { mediaFile } = mediaFilesStore.useMediaFile(props.icon);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.company-advantages-card {
	padding: 1rem 1.5rem;
	border-radius: 0.125rem;
	background: #f9f9f9;
	min-width: 15.625rem;
}
.company-advantages-card__title {
	font-size: 1.375rem;
	font-weight: 800;
	line-height: 109%;
	letter-spacing: -0.0275em;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	margin-bottom: 0.75rem;
	img {
		width: 4rem;
		height: 4rem;
		margin-left: 1rem;
	}
	@media (max-width: $middle-desktop-width) {
		font-size: 1.25rem;
		img {
			width: 3rem;
			height: 3rem;
		}
	}
}
</style>
