<template>
	<div class="contact-section">
		<div class="contact-section__head contact-section__width-wrapper">
			<SectionTitle :tagname="'h2'" class="contact-section__title">
				{{ $t('ask_question') }}
			</SectionTitle>
			<p class="contact-section__text">
				{{ $t('contact_us_text') }}
			</p>
		</div>
		<div class="contact-section__width-wrapper">
			<MainContactForm theme="dark" />
		</div>
		<img
			src="/public/images/contact-section-image.png"
			alt="Grillex"
			width="500"
			height="500"
			loading="lazy"
			class="contact-section__image"
		/>
	</div>
</template>

<script setup lang="ts">
import MainContactForm from './MainContactForm.vue';
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.contact-section {
	background: #101011;
	color: #fff;
	padding: 3rem 2.5rem;
	position: relative;
	overflow: hidden;
	--width-wrapper: 52.25rem;
	@media (max-width: $tablet-width) {
		padding: 2rem 1.5rem;
		--width-wrapper: 100%;
	}
	@media (max-width: $mobile-width) {
		padding: 1.5rem 1rem;
	}
}
.contact-section__head {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 0.5rem;
	align-items: end;
	margin-bottom: var(--size-3);
	@media (max-width: $tablet-width) {
		grid-template-columns: 1fr;
	}
}
.contact-section__title {
	font-size: var(--size-5-5);
	line-height: 0.75;
}
.contact-section__text {
	font-size: var(--size-1-125);
}
.contact-section__width-wrapper {
	max-width: var(--width-wrapper);
}
.contact-section__image {
	position: absolute;
	bottom: 0;
	right: 0;
	max-width: min(calc(100% - var(--width-wrapper)), 32rem);
	max-height: 100%;
}
</style>
