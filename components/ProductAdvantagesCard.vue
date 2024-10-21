<template>
	<li class="category-advantages-card">
		<img
			v-if="icon"
			:src="icon.url"
			:alt="htmlTagsDestroyer(title)"
			width="32"
			height="32"
			loading="lazy"
			class="category-advantages-card__icon"
		/>
		<h4
			class="category-advantages-card__title section-title"
			v-html="title"
		/>
		<p class="category-advantages-card__text" v-html="description" />
	</li>
</template>

<script setup lang="ts">
import useMediaFilesStore from '~/store/useMediaFilesStore';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';

const props = defineProps<{
	icon: string;
	title: string;
	description: string;
}>();

const { useMediaFile } = useMediaFilesStore();
const { mediaFile: icon } = useMediaFile(props.icon);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.category-advantages-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	position: relative;
	& > * {
		max-width: 11.8125rem;
	}
	@media (min-width: $tablet-width) {
		&:not(:last-child)::after {
			content: '';
			top: 50%;
			transform: translateY(-50%);
			height: 3.5rem;
			width: 0.0625rem;
			right: -1.0313rem;
			background: #80868e;
			position: absolute;
		}
	}
	@media (max-width: $tablet-width) {
		min-width: 50%;
	}
}
.category-advantages-card__icon {
	width: 2.25rem;
	height: 2.25rem;
	margin-bottom: 0.875rem;
}
.category-advantages-card__title {
	margin-bottom: 0.5rem;
	font-size: 2rem;
}
.category-advantages-card__text {
	font-size: 0.875rem;
	font-weight: 400;
}
</style>
