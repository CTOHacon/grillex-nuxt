<template>
	<div class="home-featured-articles">
		<BaseFeaturedArticleLargeCard
			v-if="largeCardTitle || largeCardText"
			:title="largeCardTitle"
			:text="largeCardText"
			:image="largeCardImage?.url || ''"
			:link="largeCardLink"
			theme="light"
			class="home-featured-articles__large-article-card"
		/>
		<BaseFeaturedArticleSmallCard
			v-if="smallCardTitle || smallCardText"
			:title="smallCardTitle"
			:text="smallCardText"
			:image="smallCardImage?.url || ''"
			:link="smallCardLink"
			class="home-featured-articles__small-article-card"
		/>
		<BaseFeaturedArticleMediumCard
			v-if="mediumCardTitle || mediumCardText"
			:title="mediumCardTitle"
			:text="mediumCardText"
			:imageUrl="mediumCardImage?.url || ''"
			:link="mediumCardLink"
			:backgroundImageUrl="backgroundImage?.url || ''"
			class="home-featured-articles__medium-article-card"
		/>
	</div>
</template>

<script setup lang="ts">
import useWebPageStore from '~/store/useWebPageStore';
import BaseFeaturedArticleLargeCard from './BaseFeaturedArticleLargeCard.vue';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import BaseFeaturedArticleSmallCard from './BaseFeaturedArticleSmallCard.vue';

const { getData } = useWebPageStore();
const { useMediaFile } = useMediaFilesStore();

const largeCardTitle = getData('featured_articles.large_card.title');
const largeCardText = getData('featured_articles.large_card.text');
const largeCardLink = getData('featured_articles.large_card.link');
const largeCardImageReference = getData('featured_articles.large_card.image');
const { mediaFile: largeCardImage } = useMediaFile(largeCardImageReference);

const smallCardTitle = getData('featured_articles.small_card.title');
const smallCardText = getData('featured_articles.small_card.text');
const smallCardLink = getData('featured_articles.small_card.link');
const smallCardImageReference = getData('featured_articles.small_card.image');
const { mediaFile: smallCardImage } = useMediaFile(smallCardImageReference);

const mediumCardTitle = getData('featured_articles.medium_card.title');
const mediumCardText = getData('featured_articles.medium_card.text');
const mediumCardLink = getData('featured_articles.medium_card.link');
const mediumCardImageReference = getData('featured_articles.medium_card.image');
const { mediaFile: mediumCardImage } = useMediaFile(mediumCardImageReference);
const backgroundImageReference = getData(
	'featured_articles.medium_card.background_image'
);
const { mediaFile: backgroundImage } = useMediaFile(backgroundImageReference);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-featured-articles {
	display: grid;
	grid-template-columns: 1fr 27.4375rem;
	grid-template-areas: 'large-artile-card small-article-card' 'large-artile-card medium-article-card';
	gap: 1rem;
	@media (max-width: $tablet-width) {
		grid-template-columns: 1fr;
		grid-template-areas: 'large-artile-card' 'small-article-card' 'medium-article-card';
	}
}
.home-featured-articles__large-article-card {
	grid-area: large-artile-card;
}
.home-featured-articles__small-article-card {
	grid-area: small-article-card;
}
.home-featured-articles__medium-article-card {
	grid-area: medium-article-card;
}
</style>
