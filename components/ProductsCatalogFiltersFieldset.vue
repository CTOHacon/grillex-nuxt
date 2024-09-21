<template>
	<fieldset
		class="product-filters-fieldset"
		:class="{
			_opened: opened
		}"
	>
		<legend
			class="product-filters-fieldset__title"
			@click="opened = !opened"
		>
			{{ title }}
			<SvgIcon name="product-filters-fieldset-arrow" />
		</legend>
		<slot v-if="opened" />
	</fieldset>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from './SvgIcon.vue';
defineProps<{
	title: string;
}>();

const opened = ref(true);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-filters-fieldset {
	border: none;
	padding: 0;
	max-width: 20.5rem;
	width: 100%;
	&:not(:last-child) {
		margin-bottom: 0.75rem;
	}
	@media (max-width: $tablet-width) {
		max-width: 100%;
	}
}
.product-filters-fieldset__title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	width: 100%;
	font-size: 1.125rem;
	font-weight: 700;
	margin-bottom: 0.75rem;
	svg {
		width: 0.75rem;
		height: 0.9375rem;
	}
}
.product-filters-fieldset._opened .product-filters-fieldset__title svg {
	transform: rotate(180deg);
}
</style>
