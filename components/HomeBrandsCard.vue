<template>
	<component
		:is="href ? 'a' : 'div'"
		v-if="logo"
		:href="href"
		:title="htmlTagsDestroyer(name)"
		class="home-brands-card"
	>
		<img
			:src="logo?.url"
			width="100"
			height="100"
			loading="lazy"
			:alt="htmlTagsDestroyer(name)"
		/>
		<span class="home-brands-card__name">
			{{ name }}
		</span>
	</component>
</template>

<script setup lang="ts">
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';
const props = defineProps<{
	name: string;
	logoReference: string;
	href: string | undefined;
}>();

import useMediaFilesStore from '~/store/useMediaFilesStore';
const mediaFilesStore = useMediaFilesStore();
const { mediaFile: logo } = mediaFilesStore.useMediaFile(props.logoReference);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
a.home-brands-card {
	cursor: pointer;
}
.home-brands-card {
	padding: 1.5rem 0.75rem;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	img {
		display: block;
		width: 100%;
		height: 100;
		object-fit: contain;
		filter: invert(1);
		opacity: 0.5;
		transition: opacity 0.3s ease-in-out;
	}
	&::before {
		content: '';
		position: absolute;
		bottom: -0.125rem;
		height: 0.125rem;
		width: 100%;
		background: #fff;
		transform: scaleX(0);
		transition: transform 0.3s ease-in-out;
	}
	&:hover img {
		opacity: 1;
	}
	@media (min-width: $tablet-width) {
		&:hover::before {
			transform: scaleX(1);
		}
	}
	@media (max-width: $tablet-width) {
		padding: 0;
		flex: 8.75rem 0 0;
		img {
			opacity: 1;
		}
	}
}
.home-brands-card__name {
	position: absolute;
	top: calc(100% + 12px);
	width: 100%;
	color: #fff;
	text-align: center;
	opacity: 0;
	transform: translateY(-12px);
	transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}
@media (min-width: $tablet-width) {
	.home-brands-card:hover .home-brands-card__name {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
