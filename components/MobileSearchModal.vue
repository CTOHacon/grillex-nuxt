<template>
	<BaseModal modal-name="mobile-search" class="mobile-search-modal">
		<div class="mobile-search-modal__inner">
			<form
				class="mobile-search-modal__head"
				:onSubmit="e => e.preventDefault()"
			>
				<input
					ref="inputRef"
					type="text"
					class="mobile-search-modal__input"
					name="search"
					id="products-search-form-input"
					:placeholder="$t('search_placeholder')"
					autocomplete="off"
					:aria-label="$t('search_placeholder')"
					@input="debouncedSearch"
					v-model="value"
				/>
				<button
					class="mobile-search-modal__submit-button"
					type="submit"
					:aria-label="$t('search')"
					@click="async () => await useProductsSearch.search(value)"
				>
					{{ $t('search') }}
				</button>
			</form>
			<div class="mobile-search-modal__main">
				<div v-if="isLoading" class="mobile-search-modal__message">
					<SectionTitle size="4" tagname="h3">
						{{ $t('loading') }}...
					</SectionTitle>
				</div>
				<ul
					class="mobile-search-modal__products"
					v-if="!isLoading && searchResult?.products.data.length"
				>
					<li
						v-for="product in searchResult?.products.data"
						:key="product.id"
					>
						<SearchResultsProductCard :product="product" />
					</li>
				</ul>
				<div
					v-if="!isLoading && !searchResult?.products.data.length"
					class="mobile-search-modal__message"
				>
					<SectionTitle size="4" tagname="h3">
						{{ $t('no_results') }}
					</SectionTitle>
				</div>
			</div>
		</div>
	</BaseModal>
</template>

<script setup lang="ts">
import useProductsSearchStore from '~/store/useProductsSearchStore';
import BaseModal from './BaseModal.vue';
import SearchResultsProductCard from './SearchResultsProductCard.vue';
import SectionTitle from './SectionTitle.vue';

const inputRef = ref<HTMLInputElement | null>(null);
const value = ref('');

const useProductsSearch = useProductsSearchStore();

let timeout: ReturnType<typeof setTimeout>;
const debouncedSearch = () => {
	clearTimeout(timeout);

	timeout = setTimeout(() => {
		useProductsSearch.search(value.value);
	}, 300);
};

const productsSearchStore = useProductsSearchStore();
const { searchResult, isLoading } = storeToRefs(productsSearchStore);
</script>

<style scoped lang="scss">
.mobile-search-modal {
	position: fixed;
	z-index: 100;
	top: var(--header-height);
	bottom: 4rem;
	left: 0;
	right: 0;
}
.mobile-search-modal__inner {
	background: #fff;
	display: flex;
	flex-direction: column;
	height: 100%;
}

.mobile-search-modal__head {
	display: flex;
	flex: 0;
	padding: 0.5rem;
	gap: 0.5rem;
}
.mobile-search-modal__input {
	flex: 1;
	padding: 0.5rem;
	border: 0.0625rem solid #d4d4d4;
	border-radius: 0.25rem;
}
.mobile-search-modal__submit-button {
	padding: 0 1rem;
	background: #292929;
	color: #fff;
	border-radius: 0.25rem;
	border: 0.0625rem solid #292929;
	cursor: pointer;
	transition: background 0.2s ease-in-out, color 0.2s ease-in-out,
		border 0.2s ease-in-out;
	&:hover {
		border: 0.0625rem solid #e4121f;
	}
	&:active {
		background: #e4121f;
	}
}
.mobile-search-modal__main {
	flex: 1;
	padding: 0 0.5rem 0.5rem 0.5rem;
	overflow: auto;
}
.mobile-search-modal__products {
	display: grid;
	grid-template-columns: 1fr;
	gap: 0.25rem;
}
.mobile-search-modal__message {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
</style>
