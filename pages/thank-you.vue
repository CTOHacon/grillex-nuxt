<template>
	<AppLayout>
		<HeaderSpacer />
		<div class="container">
			<SectionTitle :tagname="'h1'" size="4" v-if="orderId">
				{{ $t('thank_you_order_message') }}
			</SectionTitle>
			<p class="order-number" v-if="orderId">
				{{ $t('order_number') }}: {{ orderId }}
			</p>
			<SectionTitle :tagname="'h1'" size="4" v-else>
				{{ $t('thank_you_form_message') }}
			</SectionTitle>
			<BaseButton theme="accent" size="large" :href="localizePath('/')">
				{{ $t('continue_shopping') }}
			</BaseButton>
		</div>
	</AppLayout>
</template>

<script lang="ts" setup>
import HeaderSpacer from '~/components/HeaderSpacer.vue';
import SectionTitle from '~/components/SectionTitle.vue';
import AppLayout from '~/layouts/AppLayout.vue';

const route = useRoute();
const localizePath = useLocalePath();

// Order id could be presented in location get parameters ?orderId=123
const orderId = computed(() => {
	if (route.query.order_id) {
		return `${route.query.order_id}`.padStart(5, '0');
	}
	return null;
});
</script>

<style scoped lang="scss">
.container {
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: var(--size-2);
}
.order-number {
	font-size: 1.5rem;
	font-weight: 600;
}
</style>
