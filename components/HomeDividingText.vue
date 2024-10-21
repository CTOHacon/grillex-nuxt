<template>
	<section class="container home-dividing-text" v-if="title || text">
		<h2 class="home-dividing-text__title" v-html="title" />
		<p class="home-dividing-text__text" v-html="text" />
	</section>
</template>

<script setup lang="ts">
import useWebPageStore from '~/store/useWebPageStore';

const { getData } = useWebPageStore();
const title = getData('dividing_text.title');
const text = getData('dividing_text.text');
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-dividing-text {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	align-items: end;
	@media (max-width: $mobile-width) {
		grid-template-columns: 1fr;
	}
}
.home-dividing-text__title {
	font-family: 'AA Duke';
	font-weight: 400;
	font-size: var(--size-5-5);
	line-height: 88%;
}
.home-dividing-text__text {
	max-width: 40.25rem;
	font-size: var(--size-1-125);
}
</style>
