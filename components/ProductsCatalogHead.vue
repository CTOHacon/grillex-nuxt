<template>
	<section class="catalog-head-area">
		<SectionTitle tagname="h2" size="2-5">
			{{ webPageStore.data?.title }}
		</SectionTitle>
		<CatalogQuerySettings />
	</section>
</template>

<script setup lang="ts">
import CatalogQuerySettings from './CatalogQuerySettings.vue';
import SectionTitle from './SectionTitle.vue';
import useWebPageStore from '~/store/useWebPageStore';

const webPageStore = useWebPageStore();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.catalog-head-area {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	flex-wrap: wrap;
	@media (max-width: $mobile-width) {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}
}
</style>
