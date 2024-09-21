<template>
	<form
		@submit.prevent=""
		class="catalog-product-filters"
		ref="catalogProductFiltersRef"
	>
		<button
			class="catalog-product-filters__toggle-button"
			:class="{ '_is-tablet-opened': isTabletOpened }"
			:aria-label="$t('filters')"
			:aria-expanded="isTabletOpened"
			@click.prevent="isTabletOpened = !isTabletOpened"
		>
			<span v-if="isTabletOpened">
				{{ $t('close_filters') }}
			</span>
			<span v-else>
				{{ $t('filters') }}
			</span>
		</button>
		<ProductsCatalogFiltersPriceRange
			class="catalog-product-filters__price-range mb-1"
			:class="{ '_is-tablet-opened': isTabletOpened }"
		/>
		<div
			class="catalog-product-filters__filter-groups"
			:class="{ '_is-tablet-opened': isTabletOpened }"
			v-if="catalogStore.data?.product_category"
		>
			<ProductsCatalogFiltersFieldset
				v-for="productFilter in catalogStore.data.product_category
					.product_filters"
				:title="productFilter.name"
			>
				<ProductsCatalogFiltersCheckbox
					v-for="productFilterValue in productFilter.product_filter_options"
					:label="productFilterValue.name"
					:value="productFilterValue.id"
				/>
			</ProductsCatalogFiltersFieldset>
		</div>
		<div
			class="catalog-product-filters__control-buttons"
			:class="{ '_is-tablet-opened': isTabletOpened }"
		>
			<BaseButton
				class="catalog-product-filters__control-button"
				theme="accent-bordered"
				size="medium"
				@click.prevent="
					() => {
						productsFilteringStore.resetFilters();
						catalogStore.fetch();
					}
				"
			>
				{{ $t('reset') }}
			</BaseButton>
			<BaseButton
				class="catalog-product-filters__control-button"
				theme="accent"
				size="medium"
				@click.prevent="catalogStore.fetch"
			>
				{{ $t('apply') }}
			</BaseButton>
		</div>
	</form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ProductsCatalogFiltersCheckbox from './ProductsCatalogFiltersCheckbox.vue';
import ProductsCatalogFiltersFieldset from './ProductsCatalogFiltersFieldset.vue';
import ProductsCatalogFiltersPriceRange from './ProductsCatalogFiltersPriceRange.vue';
import { headerHeight } from '~/composables/useHeader';
import useProductsCatalogStore from '~/store/useProductsCatalogStore';
import BaseButton from './BaseButton.vue';
import useProductsCatalogFilteringStore from '~/store/useProductsCatalogFilteringStore';

const catalogStore = useProductsCatalogStore();
const productsFilteringStore = useProductsCatalogFilteringStore();

const isTabletOpened = ref(false);

const catalogProductFiltersRef = ref<HTMLElement | null>(null);
watch(isTabletOpened, newValue => {
	if (newValue === false && catalogProductFiltersRef.value) {
		// scroll to the top of the filters + header height
		window.scrollTo({
			top:
				catalogProductFiltersRef.value?.offsetTop -
				headerHeight.value -
				16,
			behavior: 'instant'
		});
	}
});
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.catalog-product-filters {
	padding: 1rem 0.5rem 1rem 2.5rem;
	border-radius: 0rem 0.125rem 0.125rem 0rem;
	position: sticky;
	top: var(--header-height, 0);
	max-height: calc(100vh - var(--header-height, 0rem));
	display: flex;
	flex-direction: column;
	background: #f9f9f9;
	@media (max-width: $tablet-width) {
		background: none;
		padding: 0;
		position: relative;
		top: auto;
		max-height: unset;
	}
	@media (max-width: $mobile-width) {
		padding: 1rem;
	}
}

.catalog-product-filters__toggle-button {
	position: sticky;
	top: var(--header-height);
	z-index: 4;
	border: none;
	padding: 0.5rem 1rem;
	font-weight: 700;
	border: 0.125rem solid #e4121f;
	border-radius: 0.5rem;
	background: #fff;
	z-index: 5;
	@media (min-width: $tablet-width) {
		display: none;
	}
	&._is-tablet-opened {
		margin-bottom: 1rem;
	}
}
.catalog-product-filters__price-range {
	padding-right: 2rem;
	@media (max-width: $tablet-width) {
		padding-right: 0;
		&:not(._is-tablet-opened) {
			display: none;
		}
	}
}
.catalog-product-filters__filter-groups {
	overflow: auto;
	flex: 1;
	padding-right: 2rem;
	@media (max-width: $tablet-width) {
		padding-right: 0;
		&:not(._is-tablet-opened) {
			display: none;
		}
	}
}
.catalog-product-filters__control-buttons {
	padding-top: 1rem;
	display: flex;
	gap: 0.5rem;
	@media (max-width: $tablet-width) {
		flex-direction: column;
		padding-top: 0.5rem;
		&:not(._is-tablet-opened) {
			display: none;
		}
	}
}
.catalog-product-filters__control-button {
	flex: 1;
}
</style>
