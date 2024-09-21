<template>
	<div class="catalog-filters-price-range">
		<div class="flex-row align-center justify-between mb-0-75">
			<p class="catalog-filters-price-range__head">
				<strong class="catalog-filters-price-range__title">{{
					$t('price')
				}}</strong>
				<small class="catalog-filters-price-range__value-label">{{
					$t('from')
				}}</small>
				<input
					:min="catalog?.minPrice"
					:max="catalog?.maxPrice"
					:value="priceStart"
					@change="onValueInputChanged($event, 'start')"
					class="catalog-filters-price-range__value-input"
					name="price-start"
					type="number"
				/>
				<small class="catalog-filters-price-range__value-label">{{
					$t('to')
				}}</small>
				<input
					:min="catalog?.minPrice"
					:max="catalog?.maxPrice"
					:value="priceEnd"
					@change="onValueInputChanged($event, 'end')"
					class="catalog-filters-price-range__value-input"
					name="price-end"
					type="number"
				/>
				<small class="catalog-filters-price-range__value-label">{{
					$t('uah')
				}}</small>
			</p>
		</div>
		<BaseRangeField
			:min="catalog?.minPrice || 0"
			:max="catalog?.maxPrice || 0"
			:step="1"
			v-model:to="priceEnd"
			v-model:from="priceStart"
		/>
	</div>
</template>

<script setup lang="ts">
import useProductsCatalogStore from '~/store/useProductsCatalogStore';
import BaseRangeField from './BaseRangeField.vue';
import useProductsCatalogFilteringStore from '~/store/useProductsCatalogFilteringStore';
const catalogFilteringStore = useProductsCatalogFilteringStore();
const { priceStart, priceEnd } = storeToRefs(catalogFilteringStore);
const catalogStore = useProductsCatalogStore();
const { data: catalog } = storeToRefs(catalogStore);

const onValueInputChanged = (event: Event, type: string) => {
	const input = event.target as HTMLInputElement;
	const value = input.value;

	const parsedValue = parseInt(value);
	if (isNaN(parsedValue)) {
		input.value =
			type === 'start'
				? priceStart.value.toString()
				: priceEnd.value.toString();
		return;
	}

	if (type === 'start') {
		priceStart.value = Math.max(
			catalog.value?.minPrice || 0,
			Math.min(parsedValue, priceEnd.value)
		);
	} else {
		priceEnd.value = Math.max(
			priceStart.value,
			Math.min(parsedValue, catalog.value?.maxPrice || 0)
		);
	}
};
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.catalog-filters-price-range {
	&__title {
		font-weight: 700;
		margin-right: auto;
	}
	&__head {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}
	&__value-label {
		color: #80868e;
		font-size: 0.625rem;
		font-weight: 600;
		line-height: 120%;
		text-transform: uppercase;
	}
	&__value-input {
		padding: 0.125rem 0.5rem 0.125rem 0.5rem;
		border-radius: 0.25rem;
		background: #fff;
		border: none;
		font-weight: 600;
		width: 3.75rem;
		appearance: none;
		text-align: center;
		-moz-appearance: textfield;
	}
}
</style>
