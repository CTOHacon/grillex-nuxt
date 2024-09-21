<template>
	<OverlapSection class="first-screen-wrapper">
		<HeaderSpacer />
		<HomeHero />
		<HomeBrands />
		<HomeAbout />
	</OverlapSection>
	<div class="after-first-screen-wrapper">
		<HomeCatalogMenu class="mb-2" />
		<HomePromotionArea />
	</div>
</template>

<script setup lang="ts">
import HomeAbout from '~/components/HomeAbout.vue';
import HomeBrands from '~/components/HomeBrands.vue';
import HomeCatalogMenu from '~/components/HomeCatalogMenu.vue';
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
</style>
