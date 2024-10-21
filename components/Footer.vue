<template>
	<footer class="footer">
		<div class="container footer__inner">
			<img
				class="footer__large-logo-decoration"
				src="/images/footer-large-logo-decoration.svg"
				alt="Grillex"
				width="1192px"
				height="320"
				loading="lazy"
			/>
			<div class="footer__head">
				<FooterPhoneButton />
				<FooterToTopButton />
			</div>
			<div class="footer__main">
				<!-- <p class="fs-1-125 fw-600 mb-1">
						{{ translate('Підпишіться на наші новини та акції:') }}
					</p> -->
				<!-- <FooterMailSubscriptionForm class="mb-2-75" /> -->
				<FooterSocials />
				<FooterMenu />
			</div>
			<p class="footer__copyrights">
				{{ $t('trademark') }}, 2016 – {{ new Date().getFullYear() }}
			</p>
		</div>
	</footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.footer {
	padding: 3.125rem 0;
	overflow: hidden;
	z-index: 1;
	position: relative;
	background: #000;
	color: #fff;
	@media (max-width: $tablet-width) {
		padding-bottom: calc(var(--bottom-navigation-bar-height) + 2rem);
	}
}
.footer__inner {
	position: relative;
}

.footer__head {
	display: flex;
	flex-direction: row;
	gap: var(--size-2);
	justify-content: space-between;
	align-items: center;
	margin-bottom: var(--size-2-5);
	@media (max-width: $mobile-width) {
		flex-direction: column;
	}
}
.footer__main {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: var(--size-1);
	row-gap: var(--size-3);
	@media (max-width: $tablet-width) {
		grid-template-columns: 1fr;
	}
}

.footer__large-logo-decoration {
	position: absolute;
	bottom: -3.125rem;
	left: 0;
	max-height: 100%;
	width: 78rem;
	z-index: -1;

	@media (max-width: $mobile-width) {
		display: none;
	}
}

.footer__copyrights {
	margin-top: 10.5rem;
	text-align: right;
	color: var(--color-roman-silver);
	font-weight: 700;
	@media (max-width: $tablet-width) {
		margin-top: 5.5rem;
	}
}
</style>
