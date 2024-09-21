<template>
	<button
		class="footer-to-top-button"
		@click="scrollToTop"
		:aria-label="$t('to_top')"
	>
		{{ $t('to_top') }}
		<SvgIcon name="arrow-up" class="footer-to-top-button__icon" />
	</button>
</template>

<script setup lang="ts">
const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
};
</script>

<style scoped lang="scss">
.footer-to-top-button {
	display: flex;
	height: 2.875rem;
	padding: 0rem 2rem;
	justify-content: center;
	align-items: center;
	gap: 0.625rem;
	font-size: 1.125rem;
	font-weight: 600;
	background: none;
	color: currentColor;
	border: none;
	cursor: pointer;
	transition: color 0.2s ease;
	&:hover {
		color: #e4121f;
	}
}
.footer-to-top-button__icon {
	height: 0.375rem;
	width: 0.75rem;
}
</style>
