<template>
	<section class="products-carousel">
		<div class="products-carousel__head">
			<SectionTitle
				class="products-carousel__head-title color-roman-silver"
				:tagname="'h2'"
			>
				{{ title }}
			</SectionTitle>
			<SliderNavigation
				:isFirstSlide="isFirstSlide"
				:isLastSlide="isLastSlide"
				@nextSlide="onNextSlide"
				@prevSlide="onPrevSlide"
			/>
		</div>
		<Swiper
			class="products-carousel__slider"
			:slides-per-view="1"
			:space-between="0"
			@swiper="e => (swiperInstance = e)"
			:breakpoints="{
				430: {
					slidesPerView: 2
				},
				768: {
					slidesPerView: 3
				},
				1024: {
					slidesPerView: 'auto'
				}
			}"
		>
			<SwiperSlide
				v-for="product in products"
				:key="product.id"
				class="products-carousel__slide"
			>
				<ProductCard :key="product.id" :product="product" />
			</SwiperSlide>
		</Swiper>
	</section>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import { SwiperSlide, Swiper } from 'swiper/vue';
import SwiperCoreInstance from 'swiper';
import type { TProduct } from '~/types/TProduct';
import type { TLoadsProductVariations } from '~/types/TProductVariation';
import SliderNavigation from './SliderNavigation.vue';

defineProps<{
	title: string;
	products: (TProduct & TLoadsProductVariations)[];
}>();

const swiperInstance = ref<SwiperCoreInstance | null>(null);

const onNextSlide = (): void => {
	swiperInstance.value?.slideNext();
};
const onPrevSlide = (): void => {
	swiperInstance.value?.slidePrev();
};
const isLastSlide = computed(() => {
	return swiperInstance.value?.isEnd;
});
const isFirstSlide = computed(() => {
	return swiperInstance.value?.isBeginning;
});
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.products-carousel__head {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
}
.products-carousel__slider {
	padding: 0.0625rem;
}
.products-carousel__slide {
	max-width: 16.5rem;
	height: auto;
	& > * {
		height: 100%;
	}
	@media (max-width: $tablet-width) {
		max-width: unset;
	}
}
</style>
