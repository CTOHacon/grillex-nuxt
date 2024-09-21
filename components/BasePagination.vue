<template>
	<ul class="base-padination" role="list" v-if="paginatedIndex.last_page > 1">
		<li
			class="base-padination__item"
			v-for="(link, index) in paginatedIndex.links"
			:class="{ _active: link.active }"
		>
			<a
				v-if="link.url !== null"
				:href="`/${webPagePath}${link.url}`"
				class="base-padination__link"
			>
				<SvgIcon
					v-if="link.label === 'pagination.previous'"
					class="base-padination__icon"
					name="slider-arrow-left"
				/>
				<SvgIcon
					v-else-if="link.label === 'pagination.next'"
					class="base-padination__icon"
					name="slider-arrow-right"
				/>
				<template v-else>{{ link.label }}</template>
			</a>
		</li>
	</ul>
</template>

<script setup lang="ts">
import type { TPaginated } from '~/types/TPaginated';

const props = defineProps<{
	paginatedIndex: TPaginated<any>;
}>();

const webPagePath = useWebPagePath();
</script>

<style scoped lang="scss">
.base-padination {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	flex-wrap: wrap;
	justify-content: center;
}
.base-padination__link {
	width: 1.75rem;
	height: 1.75rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	transition: background-color 0.3s, color 0.3s;
	text-decoration: none;
	&:hover {
		background-color: #e4121f;
		color: #fff;
	}
}
.base-padination__icon {
	width: 1rem;
	height: 1rem;
}
.base-padination__item._active .base-padination__link {
	background-color: #e4121f;
	color: #fff;
}
</style>
