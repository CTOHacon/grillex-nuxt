<template>
	<OverlapSection class="first-screen-wrapper">
		<HeaderSpacer />
		<HomeHero />
		<HomeBrands />
		<HomeAbout />
	</OverlapSection>
	<div class="after-first-screen-wrapper mb-5-5">
		<HomeCatalogMenu class="mb-2" />
		<HomePromotionArea />
	</div>
	<HomeDividingText class="mb-5-5" />
	<div class="container rest-of-content pt-2-5 mb-3">
		<NewProductsCarousel class="pl-2-5 pr-2-5 mb-3" />
		<FavoritesCarousel class="pl-2-5 pr-2-5 mb-3" />
		<CompanyAdvantages class="pl-2-5 pr-2-5 mb-5-5" />
		<HomeFeaturedArticles class="pl-1 pr-1" />
	</div>
</template>

<script setup lang="ts">
import HomeAbout from '~/components/HomeAbout.vue';
import HomeBrands from '~/components/HomeBrands.vue';
import HomeCatalogMenu from '~/components/HomeCatalogMenu.vue';
import HomeDividingText from '~/components/HomeDividingText.vue';
import HomeFeaturedArticles from '~/components/HomeFeaturedArticles.vue';
import HomeHero from '~/components/HomeHero.vue';
import HomePromotionArea from '~/components/HomePromotionArea.vue';
</script>

<style scoped lang="scss">
.first-screen-wrapper,
.after-first-screen-wrapper {
	background: #101011;
}
.after-first-screen-wrapper {
	padding-bottom: var(--size-5-5);
	padding-top: var(--size-6-5);
	position: relative;
	&::before {
		content: '';
		display: block;
		position: absolute;
		height: 140px;
		width: 100%;
		bottom: 100%;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
		pointer-events: none;
	}
}
.rest-of-content {
	background: #fff;
	padding-top: var(--size-2-5);
	padding-bottom: var(--size-2-5);
}
</style>
