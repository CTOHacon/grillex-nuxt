<template>
	<div
		class="overlap-section"
		:class="{ _scrolled: isScrolled }"
		ref="overlapSectionRef"
	>
		<div class="overlap-section__inner" ref="innerRef">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
const overlapSectionRef = ref<HTMLElement | null>(null);
const innerRef = ref<HTMLElement | null>(null);
const isScrolled = ref(false);

const handleScroll = () => {
	if (!overlapSectionRef.value) return;

	// if scroll position is greater than section bottom cordinate, add class
	isScrolled.value =
		overlapSectionRef.value.getBoundingClientRect().bottom <=
			window.innerHeight * 0.8 &&
		!(overlapSectionRef.value.getBoundingClientRect().bottom <= 0);

	// set overlapSectionRef height to innerRef height
	overlapSectionRef.value.style.height = `${
		innerRef.value?.getBoundingClientRect().height
	}px`;
};

onMounted(() => {
	if (!window) return;
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	if (!window) return;
	window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.overlap-section._scrolled .overlap-section__inner {
	position: fixed;
	bottom: 20vh;
	left: 0;
	width: 100%;
	z-index: 0;
}
.overlap-section + :deep(*) {
	position: relative;
	z-index: 1;
}
</style>
