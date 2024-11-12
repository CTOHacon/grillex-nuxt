<template>
	<form
		class="products-search-form"
		:class="{
			_focused: isFocused
		}"
		:onSubmit="e => e.preventDefault()"
	>
		<label
			for="products-search-form-input"
			class="products-search-form__icon-wrapper"
		>
			<SvgIcon name="search" class="products-search-form__icon" />
		</label>
		<input
			ref="inputRef"
			@focus="isFocused = true"
			@blur="isFocused = false"
			type="text"
			class="products-search-form__input"
			name="search"
			id="products-search-form-input"
			:placeholder="$t('search_placeholder')"
			autocomplete="off"
			:aria-label="$t('search_placeholder')"
			v-model="value"
			@input="debouncedSearch"
		/>
		<button
			class="products-search-form__submit-button"
			type="submit"
			:aria-label="$t('search')"
			@click="async () => await useProductsSearch.search(value)"
		>
			{{ $t('search') }}
		</button>
	</form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from './SvgIcon.vue';
import useProductsSearchStore from '~/store/useProductsSearchStore';

const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const value = ref('');

const useProductsSearch = useProductsSearchStore();

let timeout: ReturnType<typeof setTimeout>;
const debouncedSearch = () => {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		useProductsSearch.search(value.value);
	}, 300);
};
</script>

<style scoped lang="scss">
.products-search-form {
	display: flex;
	align-items: center;
	height: var(--button-height);
	border: 0.0625rem solid #292929;
	border-radius: 0.75rem;
	font-weight: 500;
	transition: height 0.2s ease-in-out, border-color 0.2s ease-in-out;
	max-width: 41.7231rem;
	width: 100%;
	&._focused {
		border-color: rgba(228, 18, 31, 0.48);
	}
}
._scrolled .products-search-form {
	// height: 3rem;
}
.products-search-form__icon-wrapper {
	width: 4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
.products-search-form__icon {
	width: 1.25rem;
	height: 1.25rem;
	color: #d4d4d4;
}
.products-search-form__input {
	height: 100%;
	flex: 1 0 0;
	background: none;
	outline: none;
	border: none;
	color: #fff;
	&::placeholder {
		color: #f9f9f9;
	}
}
.products-search-form__submit-button {
	height: calc(100% - 0.125rem);
	padding: 0 1.5rem;
	background: #292929;
	color: #fff;
	border-radius: 0.625rem;
	margin: 0.0625rem;
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
</style>
