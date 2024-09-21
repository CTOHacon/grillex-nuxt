<template>
	<button class="product-card-base-toggle-iconed-button">
		<SvgIcon :name="icon" />
	</button>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

defineProps<{
	icon: string;
}>();
</script>

<style scoped lang="scss">
.product-card-base-toggle-iconed-button {
	display: flex;
	align-items: center;
	justify-content: center;
	color: #80868e;
	z-index: 2;
	line-height: 0;
	background: none;
	border: none;
	outline: none;
	width: 2rem;
	height: 2rem;
	cursor: pointer;
	--fill-color: #fff;
	svg {
		width: 100%;
		height: 100%;
	}
	&._active {
		color: #e4121f;
		--fill-color: #e4121f;
		&:hover {
			color: #000;
			--fill-color: #000;
		}
	}
	&:hover {
		color: #e4121f;
	}
}
</style>
