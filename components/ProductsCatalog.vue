<template>
	<div class="products-catalog">
		<ProductsCatalogHead class="products-catalog__head" />
		<ProductsCatalogFilters class="products-catalog__aside" />
		<div class="products-catalog__main">
			<ul class="products-catalog__list">
				<li
					class=""
					v-for="product in data?.products.data"
					:key="product.id"
				>
					<ProductCard :product="product" />
				</li>
			</ul>
			<div class="products-catalog__bottom-navigaton">
				<ToTopButton />
				<BasePagination
					v-if="data?.products"
					:paginatedIndex="data?.products"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import useProductsCatalogStore from '~/store/useProductsCatalogStore';
import ProductsCatalogFilters from './ProductsCatalogFilters.vue';
import ProductsCatalogHead from './ProductsCatalogHead.vue';
import ProductCard from './ProductCard.vue';
import ToTopButton from './ToTopButton.vue';
import BasePagination from './BasePagination.vue';

const productsCatalogStore = useProductsCatalogStore();
const { data } = storeToRefs(productsCatalogStore);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.products-catalog {
	display: grid;
	grid-template-columns: 27.375rem 1fr;
	gap: 1rem;
	row-gap: 1.375rem;
	grid-template-rows: auto;
	grid-template-areas:
		'products-catalog__head products-catalog__head'
		'products-catalog__aside products-catalog__main';
	padding-right: 1.5rem;
	padding-bottom: 2rem;
	@media (max-width: $tablet-width) {
		padding-left: 1rem;
		padding-right: 1rem;
		grid-template-columns: 1fr;
		grid-template-areas:
			'products-catalog__head'
			'products-catalog__aside'
			'products-catalog__main';
	}
}
.products-catalog__head {
	grid-area: products-catalog__head;
	padding: 3rem 0 0 3rem;
	@media (max-width: $tablet-width) {
		padding: 2rem 0 0 0;
	}
}
.products-catalog__aside {
	grid-area: products-catalog__aside;
}
.products-catalog__main {
	grid-area: products-catalog__main;
}

.products-catalog__list {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	@media (max-width: $mobile-width) {
		grid-template-columns: 1fr;
	}
}
.products-catalog__bottom-navigaton {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 1rem;
	@media (max-width: $tablet-width) {
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
}
</style>
