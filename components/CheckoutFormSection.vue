<template>
	<div class="checkout-form-section" :id="id">
		<div class="checkout-form-section__head">
			<SectionTitle
				tagname="h2"
				size="2"
				class="checkout-form-section__title"
			>
				{{ title }}
			</SectionTitle>
			<p v-if="description" class="checkout-form-section__description">
				{{ description }}
			</p>
		</div>
		<slot />
	</div>
</template>

<script setup lang="ts">
import SectionTitle from './SectionTitle.vue';

defineProps<{
	title: string;
	description?: string;
	id: string;
}>();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.checkout-form-section {
	&:target {
		scroll-margin-top: 35vh;
	}
	@media (max-width: $tablet-width) {
		grid-template-columns: 1fr;
	}
}
.checkout-form-section__head {
	margin-bottom: var(--size-2);
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	align-items: end;
	@media (max-width: $mobile-width) {
		grid-template-columns: 1fr;
	}
}
</style>
