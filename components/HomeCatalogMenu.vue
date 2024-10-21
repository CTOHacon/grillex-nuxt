<template>
	<section
		class="container home-catalog-menu"
		v-if="items && Array.isArray(items)"
	>
		<h2 class="home-catalog-menu__title" v-html="title" v-if="title" />
		<p
			class="home-catalog-menu__subtitle"
			v-html="subtitle"
			v-if="subtitle"
		/>
		<ul class="home-catalog-menu__items" v-if="items">
			<li
				class="home-catalog-menu__item"
				v-for="item in items"
				:class="{
					_wide: item?.brands?.length
				}"
			>
				<HomeCatalogMenuCard
					:title="item?.title || ''"
					:description="item?.description || ''"
					:image="item?.image || ''"
					:link="item?.link || ''"
					:brands="item?.brands || []"
				/>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import HomeCatalogMenuCard from '@/components/HomeCatalogMenuCard.vue';
import useWebPageStore from '~/store/useWebPageStore';

const { getData } = useWebPageStore();
const title = getData('catalog_menu.title');
const subtitle = getData('catalog_menu.subtitle');
const items = getData('catalog_menu.items');
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
	@media (max-width: $tablet-width) {
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: $mobile-width) {
		grid-template-columns: 1fr;
	}
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
		@media (min-width: $mobile-width) {
			grid-column: span 2;
		}
	}
}
</style>
