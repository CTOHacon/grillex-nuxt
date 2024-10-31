<template>
	<BaseHeader
		class="header"
		:class="{ isScrollingToBottom }"
		@scrolling-to-bottom="e => (isScrollingToBottom = e)"
	>
		<HeaderLogo
			class="header__logo"
			:class="isScrollingToBottom"
			:scrolled="isScrollingToBottom"
		/>
		<div
			class="none block-tw pr-1"
			v-if="webPageStore.data?.type === 'product-page'"
		>
			<BaseIconButtonWithCount
				icon="cart"
				:count="cartStore.totalCartQuantity.value"
				@click="modalStore.toggleModal('cart')"
				class="none fs-0-875"
			/>
		</div>
		<CatalogModalToggleButton class="header__toggle-catalog" />
		<ProductsSearchForm class="header__search none-tw" />
		<div class="header__buttons-group">
			<HeaderFavouritesButton
				:class="isScrollingToBottom ? 'fs-0-875' : 'fs-1'"
			/>
			<CartModalToggleButton :active="false" />
		</div>
	</BaseHeader>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderLogo from './HeaderLogo.vue';
import useWebPageStore from '~/store/useWebPageStore';
import BaseHeader from './BaseHeader.vue';
import CatalogModalToggleButton from './CatalogModalToggleButton.vue';
import CartModalToggleButton from './CartModalToggleButton.vue';
import HeaderFavouritesButton from './HeaderFavouritesButton.vue';
import UsePreloader from './UsePreloader.vue';
import useCartStore from '~/store/useCartStore';
import useModalStateStore from '~/store/useModalStateStore';

const isScrollingToBottom = ref<boolean>(false);
const webPageStore = useWebPageStore();

const cartStore = useCartStore();
const modalStore = useModalStateStore();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.header {
	--button-height: 3.5rem;
	&.isScrollingToBottom {
		--button-height: 3rem;
	}
}

.header__logo {
	margin-right: 1.5rem;
	@media (max-width: $tablet-width) {
		margin-right: auto;
	}
}
.header__logo.isScrollingToBottom {
	margin-right: 1rem;
}

.header__toggle-catalog {
	margin-right: 2.75rem;
	@media (max-width: $tablet-width) {
		margin-right: 0;
	}
}

.header__search {
	@media (max-width: $tablet-width) {
		display: none;
	}
}

.header__buttons-group {
	display: flex;
	align-items: center;
	gap: 2rem;
	margin-left: auto;
	&:deep(> *:not(:last-child)) {
		position: relative;
		&::after {
			content: '';
			position: absolute;
			width: 1px;
			height: 2rem;
			right: calc(-1 * (1rem - 1px));
			top: calc(50% - 1rem);
			background: #2b2b2b;
		}
	}
	@media (max-width: $tablet-width) {
		display: none;
	}
}
</style>
