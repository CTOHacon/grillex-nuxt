<template>
	<div class="container home-recomendations">
		<HomePromotionAreaProduct class="home-recomendations__main" />
		<HomePromotionAreaFeaturedArticle
			class="home-recomendations__featured-article"
		/>
		<HomePromotionAreaSpecialOffer
			class="home-recomendations__special-offer"
		/>
	</div>
</template>

<script setup lang="ts">
import HomePromotionAreaFeaturedArticle from './HomePromotionAreaFeaturedArticle.vue';
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-recomendations {
	display: grid;
	grid-template-columns: 1fr 27.4375rem;
	grid-template-areas: 'main featured-article' 'main special-offer';
	gap: 1rem;
	@media (max-width: $tablet-width) {
		flex-direction: column;
	}
}
.home-recomendations__main {
	grid-area: main;
}
.home-recomendations__featured-article {
	grid-area: featured-article;
}
.home-recomendations__special-offer {
	grid-area: special-offer;
}
</style>
