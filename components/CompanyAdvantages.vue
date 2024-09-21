<template>
	<section class="company-advantages" v-if="data.company_advantages?.items">
		<SectionTitle
			:tagname="'h2'"
			class="company-advantages__title color-roman-silver"
		>
			{{ $t('advantages_title') }}
		</SectionTitle>
		<ul class="company-advantages__list">
			<CompanyAdvantagesCard
				v-for="advantage in data.company_advantages.items"
				:icon="advantage.icon"
				:title="advantage.title"
				:description="advantage.description"
				class="company-advantages__list-item"
			/>
		</ul>
	</section>
</template>

<script setup lang="ts">
import useGlobalSettingsStore from '~/store/useGlobalSettingsStore';
import CompanyAdvantagesCard from './CompanyAdvantagesCard.vue';
import SectionTitle from './SectionTitle.vue';

const globalSettingsStore = useGlobalSettingsStore();

const { data } = storeToRefs(globalSettingsStore);
</script>

<style scoped lang="scss">
.company-advantages__title {
	margin-bottom: 2rem;
}
.company-advantages__list {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}
.company-advantages__list-item {
	flex: 1;
}
</style>
