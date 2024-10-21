<template>
	<section class="home-brands" v-if="brands && Array.isArray(brands)">
		<ul class="container home-brands__list">
			<li
				class="home-brands__item"
				v-for="(brand, index) in brands"
				:key="index"
			>
				<HomeBrandsCard
					:href="brand.link"
					:name="brand.title"
					:logo-reference="brand.logo"
					class="flex-col"
				/>
			</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import useGlobalSettingsStore from '~/store/useGlobalSettingsStore';
import HomeBrandsCard from './HomeBrandsCard.vue';

const { getData, data } = useGlobalSettingsStore();
const brands = getData('brands_menu.items');
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-brands {
	border-bottom: 0.125rem solid #212121;
	@media (max-width: $tablet-width) {
		padding: 1.5rem 0;
	}
}
.home-brands__list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0;
}
</style>
