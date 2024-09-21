<template>
	<Swiper
		:slides-per-view="1"
		:space-between="0"
		:pagination="true"
		:modules="[Autoplay, Pagination, EffectFade]"
		:effect="'fade'"
		:loop="true"
		:autoplay="{
			delay: 6000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		}"
		class="home-hero-reels"
	>
		<SwiperSlide
			v-for="({ image, title, link }, index) in items"
			:key="index"
		>
			<HomeHeroReelsSlide
				v-if="image && title && link"
				:image-reference="image"
				:title="title"
				:link="link"
			/>
		</SwiperSlide>
	</Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/effect-fade';
import HomeHeroReelsSlide from './HomeHeroReelsSlide.vue';
import useWebPageStore from '~/store/useWebPageStore';

const webPage = useWebPageStore();
const data = webPage?.data?.data.data || ({} as any);
const items = data?.hero_reels || [];
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.home-hero-reels {
	height: 100%;
	width: 100%;
	border-radius: 0.125rem 0rem 0rem 0.125rem;
	border: 0.25rem solid #212121;
	border-right: none;
	@media (max-width: $tablet-width) {
		border-radius: 0 !important;
		border: 0.25rem solid #212121;
		padding: 1rem;
	}
}

.home-hero-reels:deep(.swiper-pagination) {
	position: absolute;
	z-index: 1;
	top: 2rem;
	left: 4.5rem;
	right: 4.5rem;
	display: flex;
	gap: 0.25rem;
	.swiper-pagination-bullet {
		height: 0.25rem;
		flex: 1;
		border-radius: 1.125rem;
		background: rgba(212, 212, 212, 0.32);
		position: relative;
		overflow: hidden;
		&::before {
			content: '';
			width: 100%;
			background: #fff;
			height: 100%;
			display: block;
			transition: none;
			transform: translateX(0);
		}
		&.swiper-pagination-bullet-active::before {
			transition: transform 6s linear;
		}
		&.swiper-pagination-bullet-active ~ .swiper-pagination-bullet::before {
			transform: translateX(-100%);
		}
		&.swiper-pagination-bullet-active:first-child::before {
			animation: slideBullet 6s linear forwards;
		}
	}
}
// first slide :before keyframes animation
@keyframes slideBullet {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(0);
	}
}
.home-hero-reels {
	max-width: 100%;
	border-radius: 0.125rem 0rem 0rem 0.125rem;
	border-top: 0.25rem solid #212121;
	border-bottom: 0.25rem solid #212121;
	border-left: 0.25rem solid #212121;
}
</style>
