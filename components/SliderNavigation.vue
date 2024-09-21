<template>
	<div class="navigation">
		<button
			class="navigation__button _prev"
			:aria-label="$t('previous')"
			:disabled="isFirstSlide"
			@click="emit('prevSlide')"
		>
			<SvgIcon name="slider-arrow-left" class="navigation__icon" />
		</button>
		<button
			class="navigation__button _next"
			:aria-label="$t('next')"
			:disabled="isLastSlide"
			@click="emit('nextSlide')"
		>
			<SvgIcon name="slider-arrow-right" class="navigation__icon" />
		</button>
	</div>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

defineProps<{
	isFirstSlide: boolean | undefined;
	isLastSlide: boolean | undefined;
}>();

const emit = defineEmits<{
	nextSlide: [];
	prevSlide: [];
}>();
</script>

<style scoped lang="scss">
.navigation__button {
	transition: color 0.3s ease, background-color 0.3s ease;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0.75rem;
	&:hover {
		background: #f9f9f9;
		color: #e4121f;
	}
	&:disabled {
		color: #b4b4b4;
		background-color: transparent;
		cursor: not-allowed;
	}
	svg {
		width: 1rem;
		height: 1rem;
	}
	&._prev {
		border-radius: 0.5rem 0rem 0rem 0.5rem;
	}
	&._next {
		border-radius: 0rem 0.5rem 0.5rem 0rem;
	}
}
</style>
