<template>
	<div class="container empty-cart">
		<SectionTitle tagname="h1" size="5">
			{{ $t('cart_empty_message') }}
		</SectionTitle>
		<BaseButton theme="accent" size="large" :href="localizePath('/')">
			{{ $t('continue_shopping') }}
		</BaseButton>
	</div>
</template>

<script setup lang="ts">
import SectionTitle from './SectionTitle.vue';
const localizePath = useLocalePath();
</script>

<style scoped lang="scss">
.empty-cart {
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: var(--size-2);
}
</style>
