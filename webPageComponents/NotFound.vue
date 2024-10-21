<template>
	<HeaderSpacer />
	<div class="error-page container">
		<h1 class="pt-1">404 {{ $t('404_message') }}</h1>
	</div>
</template>

<script setup lang="ts">
const { t } = useI18n();
useHead({
	title: `404 ${t('404_message')}`
});
</script>

<style scoped lang="scss">
.error-page {
	padding-top: 2rem;
}
</style>
