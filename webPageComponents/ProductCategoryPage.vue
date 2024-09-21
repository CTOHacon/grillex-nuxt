<template>
	<HeaderSpacer />
	<Breadcrumbs class="container" />
	<template v-if="data && isValidPaginationPage(data.products)">
		<ProductsCatalogPageLayout class="product-category-page mb-5-5">
			<ProductsCatalog />
			<div class="pl-1-5 pr-1-5 mb-4">
				<SeparatorLine />
			</div>
			<ProductCategoryContent />
			<div class="pl-3 pr-1-5 mt-3 mb-3">
				<SeparatorLine />
			</div>
			<div class="product-category-page__sliders mb-4">
				<NewProductsCarousel />
				<FavouritesCarousel class="mt-3" />
				<CompanyAdvantages class="mt-3" />
			</div>
		</ProductsCatalogPageLayout>
		<ContactSection class="container mb-5-5" />
	</template>
	<template v-else>
		<div class="container">
			<div class="error-message">
				<h1 class="error-message__title">404</h1>
				<BaseButton
					v-if="webPageStore.data?.path"
					:href="`/${webPageStore.data?.path}`"
					theme="accent"
					size="medium"
				>
					{{ $t('back_to') }}
					"{{ webPageStore.data.title }}"
				</BaseButton>
			</div>
		</div>
	</template>
</template>

<script setup lang="ts">
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import CompanyAdvantages from '~/components/CompanyAdvantages.vue';
import ContactSection from '~/components/ContactSection.vue';
import FavouritesCarousel from '~/components/FavouritesCarousel.vue';
import NewProductsCarousel from '~/components/NewProductsCarousel.vue';
import ProductCategoryContent from '~/components/ProductCategoryContent.vue';
import ProductsCatalog from '~/components/ProductsCatalog.vue';
import ProductsCatalogPageLayout from '~/layouts/ProductsCatalogPageLayout.vue';
import useProductsCatalogStore from '~/store/useProductsCatalogStore';
import useWebPageStore from '~/store/useWebPageStore';
import isValidPaginationPage from '~/utils/isValidPaginationPage';

const productsCatalogStore = useProductsCatalogStore();
const { data } = storeToRefs(productsCatalogStore);
const webPageStore = useWebPageStore();

if (import.meta.server) {
	await productsCatalogStore.fetch();
}

if (!data.value?.products || !isValidPaginationPage(data.value?.products))
	setup404Responce('No products found');
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.error-message {
	text-align: center;
	padding: 3rem;
	background: rgb(222, 222, 222);
	display: flex;
	flex-direction: column;
	gap: 2rem;
	&__title {
		font-size: 3rem;
	}
}
.product-category-page__sliders {
	padding: 0 3rem 3rem 3rem;
	@media (max-width: $tablet-width) {
		padding: 0 1.5rem 3rem 1.5rem;
	}
	@media (max-width: $mobile-width) {
		padding: 0 1rem 1rem 1rem;
	}
}
</style>
