<template>
	<div class="use-preloader" :class="{ _loaded: isLoaded }">
		<!-- <ClientOnly> -->
		<slot :class="slotClass" />
		<!-- </ClientOnly> -->
	</div>
</template>

<script setup lang="ts">
defineProps<{
	slotClass?: string;
}>();

const isLoaded = ref(false);
onMounted(() => {
	setTimeout(() => {
		isLoaded.value = true;
	}, 100);
});
</script>

<style scoped lang="scss">
.use-preloader {
	position: relative;
	&:not(._loaded)::after {
		content: '';
		position: absolute;
		inset: 0;
		// background: linear-gradient(
		// 	180deg,
		// 	rgba(240, 198, 51, 1) 0%,
		// 	rgba(200, 64, 26, 1) 84%
		// );
		background: #ededed;
		z-index: 10;
		display: block;
	}
	// &:deep(> *) {
	// 	z-index: 1;
	// 	position: relative;
	// }
}
</style>
