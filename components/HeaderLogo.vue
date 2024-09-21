<template>
	<a
		:href="localizePath('/') || '/'"
		class="header-logo"
		:class="{
			_scrolled: props.scrolled
		}"
	>
		<TransitionGroup name="fade">
			<img
				v-if="props.scrolled"
				src="/images/main-heder-scrolled-logo.svg"
				alt="Grillex"
				width="100"
				height="50"
				class="header-logo__image scrolled"
				:key="1"
			/>
			<img
				v-else
				height="50"
				width="50"
				src="/images/main-heder-logo.svg"
				alt="Grillex"
				class="header-logo__image default"
				:key="2"
			/>
		</TransitionGroup>
	</a>
</template>

<script setup lang="ts">
const props = defineProps<{
	scrolled: boolean;
}>();

const localizePath = useSwitchLocalePath();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.header-logo {
	display: block;
	width: 10.25rem;
	height: 100%;
	position: relative;
	transition: width 0.2s ease-in-out, margin-right 0.2s ease-in-out;
	&._scrolled {
		width: 2.1875rem;
	}
	@media (max-width: $tablet-width) {
		width: 6.25rem;
	}
}

.header-logo__image {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
	max-width: unset;
	&.scrolled {
		width: 2rem;
		@media (max-width: $mobile-width) {
			width: 1.75rem;
		}
	}
	&.default {
		height: 2.5rem;
		@media (max-width: $mobile-width) {
			height: 1.75rem;
		}
	}
}

// transition
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
