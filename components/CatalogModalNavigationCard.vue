<template>
	<li :class="['catalog-modal-navigation-card', { noImageCard }]">
		<ul
			role="list"
			class="catalog-modal-navigation-card__list fw-600 fs-1-125"
		>
			<li class="catalog-modal-navigation-card__list-item _title-item">
				<p
					class="catalog-modal-navigation-card__title"
					v-html="title"
				/>
			</li>
			<li
				class="catalog-modal-navigation-card__list-item"
				v-for="item in items"
			>
				<a
					:href="item.url"
					v-if="item.url"
					class="catalog-modal-navigation-card__list-item-link"
				>
					{{ item.title }}
				</a>
				<p v-else class="catalog-modal-navigation-card__list-item-link">
					{{ item.title }}
				</p>
			</li>
		</ul>
		<img
			v-if="imageUrl"
			:src="imageUrl"
			:alt="htmlTagsDestroyer(title)"
			width="290"
			height="290"
			loading="lazy"
			class="catalog-modal-navigation-card__image"
		/>
		<LinkForwardButton
			class="catalog-modal-navigation-card__link"
			v-if="link && linkText"
			:href="link"
		>
			{{ linkText }}
		</LinkForwardButton>
	</li>
</template>

<script setup lang="ts">
import LinkForwardButton from './LinkForwardButton.vue';
import htmlTagsDestroyer from '~/utils/htmlTagsDestroyer';
defineProps<{
	title: string;
	items: {
		title: string;
		url: string;
	}[];
	noImageCard?: boolean;
	imageUrl?: string;
	link: string;
	linkText: string;
}>();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.catalog-modal-navigation-card {
	position: relative;
	border-radius: 0.125rem;
	background: #f9f9f9;
	padding: 2rem 0 3.5rem 0;
	@media (max-width: $tablet-width) {
		padding: 2rem;
	}
	@media (max-width: $mobile-width) {
		padding: 1.25rem 1rem;
	}
}
.catalog-modal-navigation-card__title {
	color: #80868e;
	font-family: AA Duke;
	font-size: 3rem;
	line-height: 88%;
	text-transform: uppercase;
	padding: 0 1.5rem;

	@media (max-width: $mobile-width) {
		padding: 0;
	}
}
.catalog-modal-navigation-card__list-item {
	&._title-item {
		grid-row: span 2;
	}
}
.catalog-modal-navigation-card__list {
	position: relative;
	display: grid;
	grid-auto-rows: 1fr;
	z-index: 1;
}
.catalog-modal-navigation-card.noImageCard
	.catalog-modal-navigation-card__list {
	grid-template-columns: 1fr 1fr;
	@media (max-width: $mobile-width) {
		grid-template-columns: 1fr;
	}
}
.catalog-modal-navigation-card__list-item-link {
	position: relative;
	display: block;
	padding: 0.5rem 1.5rem;
	color: inherit;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
	&:first-child {
		padding-top: 0;
	}
	@media (max-width: $mobile-width) {
		padding: 0.5rem 0;
	}
}
.catalog-modal-navigation-card__link {
	margin-top: 4rem;
	position: relative;
	z-index: 1;
	@media (max-width: $mobile-width) {
		margin-top: 2rem;
		padding-left: 0;
		font-size: 0.875rem;
	}
}

.catalog-modal-navigation-card__image {
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 0;
	max-height: 18.125rem;
	height: 100%;
	width: auto;
	z-index: 0;
	@media (max-width: $tablet-width) {
		max-height: 12.5rem;
	}
	@media (max-width: $mobile-width) {
		max-height: 9.875rem;
	}
}
</style>
