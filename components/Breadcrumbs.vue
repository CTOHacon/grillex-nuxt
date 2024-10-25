<template>
	<nav class="breadcrumbs">
		<ul class="breadcrumbs__list">
			<li class="breadcrumbs__list-item">
				<a href="/">{{ $t('home') }}</a>
			</li>
			<li
				v-if="breadcrumbs"
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="index"
				class="breadcrumbs__list-item"
			>
				<a
					v-if="index !== breadcrumbs.length - 1"
					:href="breadcrumb.path"
					>{{ breadcrumb.title }}</a
				>
				<span v-else>{{ breadcrumb.title }}</span>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
import useWebPageStore from '~/store/useWebPageStore';

const webPageStore = useWebPageStore();
import { defineProps } from 'vue';

const props = defineProps<{
	breadcrumbs?: { title: string; path: string }[];
}>();

const breadcrumbs = props.breadcrumbs || webPageStore.data?.breadcrumbs;
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.breadcrumbs {
	&__list {
		display: flex;
		align-items: center;
		gap: 1.875rem;
		row-gap: 1rem;
		flex-wrap: nowrap;
		white-space: nowrap;
		overflow: auto;
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
		max-width: 100%;
		@media (max-width: $mobile-width) {
			padding-top: 1rem;
			padding-bottom: 1rem;
		}
	}
	&__list-item {
		position: relative;
		&:first-child a::before {
			content: '';
			margin-left: 0.375rem;
			margin-right: 0.5rem;
			width: 0.8125rem;
			height: 1.125rem;
			display: block;
			background: url('~/images/breadcrumbs-home-icon.svg') no-repeat
				center / contain;
		}
		&:not(:last-child)::after {
			content: '';
			position: absolute;
			left: calc(100% + 0.75rem);
			top: 50%;
			transform: translateY(-50%);
			width: 0.375rem;
			height: 0.375rem;
			border-radius: 50%;
			background: #e4121f;
		}
		a {
			font-weight: 700;
			transition: color 0.3s ease;
			position: relative;
			display: flex;
			align-items: center;
			text-decoration: none;
			&:not(span):hover {
				// color: #e4121f;
				text-decoration: underline;
			}
		}
	}
}
</style>
