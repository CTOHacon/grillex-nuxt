<template>
	<header class="header" ref="headerRef">
		<PreHeader />
		<div class="header-content-wrapper">
			<div
				class="header-content-wrapper__inner container"
				:class="{
					_scrolled: isScrollingToBottom
				}"
			>
				<slot />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue';
import PreHeader from './PreHeader.vue';
import useHeader from '../composables/useHeader';

const { setupHeader } = useHeader();
const headerRef = ref<HTMLElement | null>(null);
setupHeader(headerRef);

const isScrollingToBottom = ref(false);
const prevScrollPosition = ref(0);
const scrollThreshold = 10;

const onScroll = () => {
	const scrollPosition = window.scrollY;
	const scrollDelta = scrollPosition - prevScrollPosition.value;

	if (Math.abs(scrollDelta) >= scrollThreshold) {
		isScrollingToBottom.value = scrollDelta > 0;
		prevScrollPosition.value = scrollPosition;
	}
	emit('scrollingToBottom', isScrollingToBottom.value);
};

onMounted(() => {
	if (!window) return;
	prevScrollPosition.value = window.scrollY;
	window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
	if (!window) return;
	window.removeEventListener('scroll', onScroll);
});

provide('isScrollingToBottom', isScrollingToBottom);
const emit = defineEmits({
	//@ts-ignore
	scrollingToBottom: (isScrollingToBottom: boolean) => true
});
</script>
<style lang="scss">
@import '~/styles/variables.scss';
body {
	--header-inner-height: 6.125rem;
	--max-header-height: calc(
		var(--header-inner-height) + var(--preheader-height)
	);
	@media (max-width: $tablet-width) {
		--header-inner-height: 4rem;
	}
}
</style>
<style scoped lang="scss">
@import '~/styles/variables.scss';
.header {
	position: fixed;
	z-index: 15;
	top: 0;
	left: 0;
	width: 100%;
}
.header-content-wrapper {
	background: #000;
	color: #fff;
	border-bottom: 0.0625rem solid #292929;
}
.header-content-wrapper__inner {
	height: var(--header-inner-height);
	transition: height 0.2s ease-in-out;
	display: flex;
	align-items: center;
	&._scrolled {
		height: calc(var(--header-inner-height) - 1rem);
		@media (max-width: $tablet-width) {
			height: var(--header-inner-height);
		}
	}
}
</style>
