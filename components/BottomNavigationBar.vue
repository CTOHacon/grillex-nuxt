<template>
	<div class="bottom-navigation-bar">
		<!-- <BaseIconButtonWithCount
			icon="bottom-navigation-bar-search"
			:count="0"
			:active="false"
			:area-label="$t('search')"
		/> -->
		<!-- <LikedProductsButton /> -->
		<!-- <ProductsComparisonButton /> -->
		<CartModalTogleButton />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.bottom-navigation-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #000;
	padding: 0.5rem;
	z-index: 9;
	color: #fff;
	display: none;
	justify-content: center;
	align-items: center;
	border-top: 0.0625rem solid #292929;
	--button-height: 3rem;
	@media (max-width: $tablet-width) {
		font-size: 1rem;
		display: flex;
	}
}
</style>
