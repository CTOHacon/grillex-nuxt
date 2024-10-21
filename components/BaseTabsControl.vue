<template>
	<ul class="base-tabs-control" role="list">
		<li
			v-for="item in items"
			class="base-tabs-control__item"
			:class="{ active: item.key === activeItem }"
			:key="item.key"
			@click="() => emit('change', item.key)"
		>
			{{ item.title }}
			<span v-if="item.counter" class="base-tabs-control__counter">
				{{ item.counter }}
			</span>
		</li>
	</ul>
</template>

<script setup lang="ts">
import type { TTabsControlItem } from '@/types/TTabsControlItem';

defineProps<{
	items: TTabsControlItem[];
	activeItem: string;
}>();

const emit = defineEmits({
	change: (key: string) => key
});
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.base-tabs-control {
	display: flex;
	flex-wrap: wrap;
	@media (max-width: $tablet-width) {
		font-size: 0.875em;
		flex-wrap: nowrap;
		overflow-x: auto;
		white-space: nowrap;
	}
}

.base-tabs-control__item {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 3.9375em;
	flex: 1 0 fit-content;
	padding: 1.5em;
	position: relative;
	font-weight: 700;
	cursor: pointer;

	&::before {
		content: '';
		position: absolute;
		bottom: -0.0625rem;
		height: 0.125rem;
		width: 100%;
		background: #e4121f;
		transform: scaleX(0);
		transition: opacity 0.3s, transform 0.3s;
		@media (max-width: $tablet-width) {
			bottom: 0;
		}
	}
	&:not(.active)::before {
		background: currentColor;
	}
	&:hover:not(.active)::before {
		transform: scaleX(1);
	}
	&.active {
		&::before {
			transform: scaleX(1);
		}
	}
	@media (max-width: $tablet-width) {
		min-width: unset;
		height: auto;
		padding: 1.5rem 1rem;
	}
	@media (max-width: $mobile-width) {
		padding: 1rem 0.5rem;
	}
}
.base-tabs-control__counter {
	margin-left: 0.25rem;
	font-size: 0.875em;
	padding: 0.125rem 0.25rem 0.1875rem 0.25rem;
	line-height: 1;
	background: #e4121f;
	color: #fff;
	border-radius: 2.5rem;
	margin-top: 0.1em;
}
</style>
