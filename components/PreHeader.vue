<template>
	<div
		class="pre-header"
		:class="{
			_scrolled: isScrolled
		}"
	>
		<SvgIcon name="ukraine-logo" class="pre-header__icon" />
		<p class="pre-header__title">
			{{ $t('together_to_victory') }}
		</p>
		<a class="pre-header__link" href="#need-link" target="_blank">
			{{ $t('support_army') }}
		</a>
		<LocaleSwitch class="pre-header__locale-switch" />
	</div>
</template>

<script setup lang="ts">
const isScrolled = ref(false);
const onScroll = () => {
	isScrolled.value = window.scrollY > 0;
};
onMounted(() => {
	window.addEventListener('scroll', onScroll);
});
onUnmounted(() => {
	window.removeEventListener('scroll', onScroll);
});
</script>
<style lang="scss">
@import '~/styles/variables.scss';

body {
	--preheader-height: 2.125rem;
	@media (max-width: $mobile-width) {
		--preheader-height: 1.875rem;
	}
}
</style>
<style scoped lang="scss">
@import '~/styles/variables.scss';
.pre-header {
	background: #570711;
	height: var(--preheader-height);
	font-size: 0.875rem;
	transition: height 0.2s ease-in-out;
	overflow: hidden;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	&._scrolled {
		height: 0;
	}
	@media (max-width: $mobile-width) {
		font-size: 0.75rem;
	}
}
.pre-header__icon {
	width: 1.5em;
	height: 1.5em;
	margin-right: 0.5rem;
}
.pre-header__title {
	font-weight: 700;
	line-height: 1.125rem;
	letter-spacing: -0.01em;
	margin-right: 1rem;
}
.pre-header__link {
	color: inherit;
	text-decoration: underline;
}
.pre-header__locale-switch {
	position: absolute;
	right: 1rem;
	top: 50%;
	transform: translateY(-50%);
}
</style>
