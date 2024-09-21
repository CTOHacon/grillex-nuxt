<template>
	<section class="container home-catalog-menu">
		<h2 class="home-catalog-menu__title" v-html="catalogMenuData.title" />
		<p
			class="home-catalog-menu__subtitle"
			v-html="catalogMenuData.subtitle"
		/>
		<ul class="home-catalog-menu__items">
			<li
				class="home-catalog-menu__item"
				v-for="item in catalogMenuData.items"
				:class="{
					_wide: item.brands?.length
				}"
			>
				<HomeCatalogMenuCard
					:title="item.title"
					:description="item.description"
					:image="item.image"
					:link="item.link"
					:brands="item.brands || []"
				/>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import HomeCatalogMenuCard from '@/components/HomeCatalogMenuCard.vue';
import useWebPageStore from '~/store/useWebPageStore';

const webPage = useWebPageStore();
const catalogMenuData = webPage.data?.data?.data?.catalog_menu || {};
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';

.home-catalog-menu {
}

.home-catalog-menu__title {
	font-family: 'AA Duke';
	font-weight: 400;
	font-size: var(--size-5-5);
	line-height: 88%;
	text-transform: uppercase;
	color: #ffffff;
	margin-bottom: 1rem;
}
.home-catalog-menu__subtitle {
	font-style: normal;
	font-weight: 300;
	font-size: var(--size-1-5);
	line-height: 133%;
	color: #d5d5d5;
	max-width: 33rem;
}
.home-catalog-menu__items {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 1rem;
	&:not(:first-child) {
		margin-top: var(--size-5);
	}
}
.home-catalog-menu__item {
	& > * {
		height: 100%;
		width: 100%;
	}
	&._wide {
		grid-column: span 2;
	}
}
</style>
