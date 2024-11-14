<template>
	<AppLayout>
		<HeaderSpacer />
		<Breadcrumbs
			class="container"
			:breadcrumbs="[
				{
					title: $t('favorites'),
					path: '/favorites'
				}
			]"
		/>
		<div class="container favorites-page-main mb-5-5">
			<SectionTitle tagname="h1" size="3" class="mb-2">
				{{ $t('wished') }}
			</SectionTitle>
			<ul class="products-list mb-4" v-if="products.length">
				<li class="" v-for="product in products" :key="product.id">
					<ProductCard :product="product" />
				</li>
			</ul>
			<div v-else class="error-message mb-3">
				<SectionTitle tagname="h1" size="3">
					{{ $t('no_favorites') }}
				</SectionTitle>
				<BaseButton href="/" theme="accent" size="medium">
					{{ $t('catalog') }}
				</BaseButton>
			</div>
			<NewProductsCarousel />
			<CompanyAdvantages class="mt-3 mb-4" />
		</div>
		<ContactSection class="container mb-5-5" />
	</AppLayout>
</template>

<script setup lang="ts">
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import CompanyAdvantages from '~/components/CompanyAdvantages.vue';
import ContactSection from '~/components/ContactSection.vue';
import NewProductsCarousel from '~/components/NewProductsCarousel.vue';
import SectionTitle from '~/components/SectionTitle.vue';
import AppLayout from '~/layouts/AppLayout.vue';
import useFavoritesStore from '~/store/useFavoritesStore';

const favoritesStore = useFavoritesStore();
const products = computed<any>(() => {
	return favoritesStore.favoriteItems.value
		.filter(item => item.product !== undefined)
		.map(item => item.product);
});

const { t } = useI18n();

useHead({
	title: t('favorites'),
	meta: [
		{
			name: 'robots',
			content: 'noindex, nofollow'
		}
	]
});
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.products-list {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	@media (max-width: $middle-desktop-width) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media (max-width: $tablet-width) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (max-width: $mobile-width) {
		grid-template-columns: 1fr;
	}
}

.favorites-page-main {
	padding: 3rem;
	background: #fff;
	@media (max-width: $mobile-width) {
		padding: 1rem;
	}
}

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
</style>
