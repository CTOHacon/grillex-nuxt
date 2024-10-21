<template>
	<Swiper
		:slides-per-view="1"
		:space-between="0"
		:modules="[Autoplay]"
		:loop="true"
		@swiper="swiperInstance => (swiper = swiperInstance)"
		:autoplay="{
			delay: 5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		}"
		class="home-hero-products-carousel"
		v-if="items && Array.isArray(items)"
	>
		<button
			class="home-hero-products-carousel__nav-button _prev"
			@click="prevSlide"
		>
			<SvgIcon
				name="rich-slider-arrow"
				class="home-hero-products-carousel__nav-button-icon"
			/>
		</button>
		<button
			class="home-hero-products-carousel__nav-button _next"
			@click="nextSlide"
		>
			<SvgIcon
				name="rich-slider-arrow"
				class="home-hero-products-carousel__nav-button-icon"
			/>
		</button>
		<SwiperSlide
			v-for="({ title, price, image }, index) in items"
			:key="index"
		>
			<HomeHeroProductsCarouselSlide
				v-if="title && price && image"
				:key="index"
				:title="title"
				:price="price"
				:image-reference="image"
			/>
		</SwiperSlide>
	</Swiper>
</template>

<script setup lang="ts">
import HomeHeroProductsCarouselSlide from './HomeHeroProductsCarouselSlide.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCoreInstance from 'swiper';
import { Autoplay } from 'swiper/modules';
import { ref } from 'vue';
import useWebPageStore from '~/store/useWebPageStore';

const { getData } = useWebPageStore();
const items = getData('featured_products');

const swiper = ref<SwiperCoreInstance | null>(null);

const nextSlide = () => {
	swiper.value?.slideNext();
};
const prevSlide = () => {
	swiper.value?.slidePrev();
};
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-hero-products-carousel {
	border-radius: 0.125rem 0rem 0rem 0.0625rem;
	border: 0.0625rem solid #212121;
	background: #111111;
	color: #fff;
	width: 100%;
	@media (max-width: $mobile-width) {
		border-radius: 0 !important;
		border: 0.0625rem solid #212121;
	}
}

.home-hero-products-carousel__nav-button {
	color: #fff;
	transition: color 0.2s ease-in-out;
	position: absolute;
	top: calc(50% - 0.625rem);
	width: 1.25rem;
	height: 1.25rem;
	background: none;
	border: none;
	z-index: 2;
	cursor: pointer;
	&._prev {
		transform: rotate(180deg);
		left: 1rem;
	}
	&._next {
		right: 1rem;
	}
	&:hover {
		color: #e4121f;
	}
}
.home-hero-products-carousel__nav-button-icon {
	width: 100%;
	height: 100%;
}
</style>
