<template>
	<section class="home-hero">
		<HomeHeroMain class="home-hero__main" />
		<div class="home-hero__aside">
			<HomeHeroReels class="home-hero__reels" />
			<HomeHeroProductsCarousel />
		</div>
	</section>
</template>

<script setup lang="ts">
import HomeHeroMain from './HomeHeroMain.vue';
import HomeHeroProductsCarousel from './HomeHeroProductsCarousel.vue';
import HomeHeroReels from './HomeHeroReels.vue';
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-hero {
	max-width: 108rem;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-wrap: nowrap;
	gap: 1rem;
	@media (max-width: $tablet-width) {
		display: block;
	}
}
.home-hero__main {
	flex: 1;
}
.home-hero__aside {
	display: flex;
	flex-direction: column;
	flex: 3 0 0;
	max-width: calc(30% - 0.5rem);
	@media (max-width: $tablet-width) {
		max-width: 100%;
	}
}
.home-hero__reels {
	display: flex;
	flex-direction: column;
	@media (min-width: $tablet-width) {
		margin-bottom: 0.75rem;
	}
}
</style>
