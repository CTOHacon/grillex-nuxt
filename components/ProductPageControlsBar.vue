<template>
	<nav
		class="product-page-controls-bar"
		ref="productPageControlsBarRef"
		:class="{ isScrolled: isScrolled }"
	>
		<div class="product-page-controls-bar__buttons-area">
			<ProductPageControlsBarCartControl
				class="product-page-controls-bar__cart-control"
			/>
			<ProductPageControlsBarButtons
				class="product-page-controls-bar__buttons"
			/>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ProductPageControlsBarButtons from './ProductPageControlsBarButtons.vue';
import ProductPageControlsBarCartControl from './ProductPageControlsBarCartControl.vue';

const productPageControlsBarRef = ref<HTMLElement | null>(null);
const parentElement = ref(productPageControlsBarRef.value?.parentElement);
const isScrolled = ref(false);

const handleScroll = () => {
	if (!parentElement.value) return;
	if (parentElement.value.getBoundingClientRect().top < -200)
		isScrolled.value = true;
	else isScrolled.value = false;
};

onMounted(() => {
	parentElement.value = productPageControlsBarRef.value?.parentElement;
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-page-controls-bar {
	position: sticky;
	z-index: 2;
	top: var(--header-height);
	display: flex;
	border-bottom: 0.0625rem solid #afbacc;
	background: #fff;
	min-height: 4rem;
	@media (max-width: $mobile-width) {
		min-height: 3.25rem;
	}
}
.product-page-controls-bar__buttons-area {
	display: flex;
	justify-content: flex-end;

	padding-left: 1rem;
	margin-left: auto;
	@media (max-width: $tablet-width) {
		margin-left: unset;
		justify-content: space-between;
		width: 100%;
	}
}

.product-page-controls-bar__cart-control {
	transition: transform 0.2s ease, opacity 0.2s ease;
	opacity: 0;
	transform: translateY(-100%);
	margin-right: 1rem;
}

.product-page-controls-bar.isScrolled .product-page-controls-bar__cart-control {
	opacity: 1;
	transform: translateY(0);
}
</style>
