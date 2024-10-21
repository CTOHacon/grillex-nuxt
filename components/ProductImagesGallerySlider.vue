<template>
	<section class="product-images-gallery-slider">
		<Swiper
			class="product-images-gallery-slider__main-slider"
			:loop="true"
			:navigation="true"
			:modules="[Navigation, Thumbs]"
			:thumbs="{ swiper: thumbsSwiper ? thumbsSwiper : null }"
			@swiper="e => (mainSwiper = e)"
		>
			<SwiperSlide
				class="product-images-gallery-slider__main-slide"
				v-for="slide in slides"
			>
				<img
					:src="slide.url"
					:alt="
						slide.title ? slide.title : productVariation.data?.name
					"
					:width="slide.sizes?.full.width"
					:height="slide.sizes?.full.height"
					loading="lazy"
				/>
			</SwiperSlide>
		</Swiper>
		<Swiper
			class="product-images-gallery-slider__thumbnails-slider"
			:spaceBetween="8"
			slidesPerView="auto"
			:freeMode="true"
			:loop="true"
			@swiper="e => (thumbsSwiper = e)"
		>
			<button
				class="product-images-gallery-slider__nav-button _prev"
				@click="onPrevSlide"
			>
				<SvgIcon name="slider-arrow-left" />
			</button>
			<button
				class="product-images-gallery-slider__nav-button _next"
				@click="onNextSlide"
			>
				<SvgIcon name="slider-arrow-right" />
			</button>
			<template v-for="slide in slides">
				<SwiperSlide
					class="product-images-gallery-slider__thumbnails-slide"
					v-if="slide.sizes?.thumbnail"
					:key="slide.id"
				>
					<img
						:src="slide.sizes?.thumbnail.url"
						:width="slide.sizes?.thumbnail.width"
						:height="slide.sizes?.thumbnail.height"
						:alt="
							slide.title
								? slide.title
								: productVariation.data?.name
						"
					/>
				</SwiperSlide>
			</template>
		</Swiper>
	</section>
</template>

<script setup lang="ts">
import { SwiperSlide, Swiper } from 'swiper/vue';
import SwiperCoreInstance from 'swiper';
import { ref } from 'vue';
import { Navigation, Thumbs } from 'swiper/modules';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import useProductVariationForWebPageStore from '~/store/useProductVariationForWebPageStore';
import type { TMediaFile } from '~/types/TMediaFile';

const mediaFilesStore = useMediaFilesStore();
const productVariation = useProductVariationForWebPageStore();

const slides = ref<TMediaFile[]>([]);
productVariation.data?.images.forEach(image => {
	const { mediaFile } = mediaFilesStore.useMediaFile(image);
	if (mediaFile.value) {
		slides.value.push(mediaFile.value);
	}
});

const thumbsSwiper = ref<SwiperCoreInstance | null>(null);
const mainSwiper = ref<SwiperCoreInstance | null>(null);

const onNextSlide = (): void => {
	mainSwiper.value?.slideNext();
};
const onPrevSlide = (): void => {
	mainSwiper.value?.slidePrev();
};
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.product-images-gallery-slider {
}
.product-images-gallery-slider__main-slider {
	border: 0.0625rem solid #d4d4d4;
	border-radius: 0.25rem;
	margin-bottom: 1rem;
	max-height: 500px;
	display: flex;
	align-items: center;
}
.product-images-gallery-slider__main-slide {
	aspect-ratio: 1/1;
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
}
.product-images-gallery-slider__thumbnails-slider {
	position: relative;
}
.product-images-gallery-slider__thumbnails-slide {
	border-radius: 0.5rem;
	border: 0.0625rem solid #d4d4d4;
	overflow: hidden;
	aspect-ratio: 1/1;
	overflow: hidden;
	transition: border-color 0.3s;
	cursor: pointer;
	width: 5.5rem;
	height: 5.5rem;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	&.swiper-slide-thumb-active {
		border-color: #e4121f;
	}
}
.product-images-gallery-slider__nav-button {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 1;
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	border: 1px solid #f0f0f0;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: border-color 0.2s ease;
	&:hover {
		border-color: #e4121f;
	}
	svg {
		width: 1rem;
		height: 1rem;
	}
	&._prev {
		left: 1rem;
	}
	&._next {
		right: 1rem;
	}
	@media (max-width: $mobile-width) {
		&._prev {
			left: 0.5rem;
		}
		&._next {
			right: 0.5rem;
		}
	}
}
</style>
