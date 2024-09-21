<template>
	<p class="product-card-statuses">
		<span class="product-card-statuses__item _new" v-if="product.is_new">
			{{ $t('new_one') }}
		</span>
	</p>
</template>

<script lang="ts" setup>
import type { TProduct } from '~/types/TProduct';
import type { TLoadsProductVariations } from '~/types/TProductVariation';

const props = defineProps<{
	product: TProduct & TLoadsProductVariations;
}>();
</script>

<style lang="scss">
.product-card-statuses {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}
.product-card-statuses__item {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.125rem 0.5rem;
	width: 5.6875rem;
	height: 1.25rem;
	border-radius: 0.75rem;
	font-size: 0.75rem;
	font-weight: 400;
	line-height: 100%;

	&._new {
		background: #ededed;
	}
}
</style>
