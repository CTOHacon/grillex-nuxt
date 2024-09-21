<template>
	<nav class="base-table-of-contents">
		<h3 v-if="title" class="base-table-of-contents__title fs-1-125 fw-700">
			{{ title }}
		</h3>
		<ul class="base-table-of-contents__list" role="list">
			<li
				v-for="item in items"
				:key="item.anchor"
				class="base-table-of-contents__list-item"
			>
				<a
					:href="'#' + item.anchor"
					@click="() => emit('itemClick', item.anchor)"
					class="base-table-of-contents__list-item-anchor"
				>
					<SvgIcon
						class="base-table-of-contents__list-item-anchor-icon"
						name="table-of-contents-arrow"
					/>
					{{ item.title }}
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
defineProps<{
	items: {
		title: string;
		anchor: string;
	}[];
	title?: string;
}>();

// define onClick emit
const emit = defineEmits({
	itemClick: (anchor: string) => {
		return anchor;
	}
});
</script>

<style scoped lang="scss">
.base-table-of-contents {
	background: #f9f9f9;
}
.base-table-of-contents__title {
	padding: 1rem 1rem 0 1rem;
}
.base-table-of-contents__list {
	padding: 1.5rem 0;
}

.base-table-of-contents__list-item-anchor {
	display: flex;
	gap: 0.5em;
	align-items: center;
	padding: 0.5em 1.5em;
	font-weight: 600;
	text-decoration: none;
}
.base-table-of-contents__list-item-anchor-icon {
	width: 1em;
	height: 1em;
	transition: color 0.2s ease-in-out;
}
.base-table-of-contents__list-item-anchor:hover
	.base-table-of-contents__list-item-anchor-icon {
	color: #e4121f;
}
</style>
