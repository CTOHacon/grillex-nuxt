<template>
	<BaseModal
		modal-name="search"
		:leave-header-space="true"
		:lock-scroll="true"
		class="search-modal"
	>
		<div class="search-modal__inner-wrapper container">
			<div v-if="isLoading" class="search-modal__message">
				<SectionTitle size="4" tagname="h3">
					{{ $t('loading') }}...
				</SectionTitle>
			</div>
			<ul
				class="search-modal__products"
				v-if="!isLoading && searchResult?.products.data.length"
			>
				<li
					v-for="product in searchResult?.products.data"
					:key="product.id"
				>
					<ProductCard :product="product" />
				</li>
			</ul>
			<div
				v-if="!isLoading && !searchResult?.products.data.length"
				class="search-modal__message"
			>
				<SectionTitle size="4" tagname="h3">
					{{ $t('no_results') }}
				</SectionTitle>
			</div>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import useProductsSearchStore from '~/store/useProductsSearchStore';
import SectionTitle from './SectionTitle.vue';

const productsSearchStore = useProductsSearchStore();
const { searchResult, isLoading } = storeToRefs(productsSearchStore);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.search-modal__inner-wrapper {
	border-radius: 0px 0px 0.25rem 0.25rem;
	border-bottom: 0.25rem solid #d4d4d4;
	background: #fff;
	margin-left: auto;
	margin-right: auto;
	padding: 1rem;
	overflow-y: auto;
	max-height: calc(100vh - var(--header-height) - 1rem);
	@media (max-width: $tablet-width) {
		margin: 0;
		max-height: unset;
		height: calc(100vh - var(--header-height));
		max-width: 100%;
	}
}
.search-modal__products {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
	gap: 1rem;
}
.search-modal__message {
	padding: 4rem 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
</style>
