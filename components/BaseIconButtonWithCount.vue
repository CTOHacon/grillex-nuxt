<template>
	<component
		:is="props.href ? 'a' : 'button'"
		class="base-icon-button-with-count"
		:class="{ _active: props.active }"
		:href="props.href"
	>
		<SvgIcon class="base-icon-button-with-count__icon" :name="icon" />
		<span
			class="base-icon-button-with-count__count-wrapper"
			v-if="props.count > 0"
		>
			<span class="base-icon-button-with-count__count">
				{{ props.count }}
			</span>
		</span>
	</component>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

const props = defineProps<{
	count: number;
	icon: string;
	active?: boolean;
	href?: string;
}>();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';

.base-icon-button-with-count {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3rem;
	height: 3rem;
	background: none;
	border: none;
	color: inherit;
	cursor: pointer;
	transition: font-size 0.2s ease-in-out;
	&._active .icon {
		color: #e4121f;
	}
	&:hover .base-icon-button-with-count__icon {
		color: #fff;
	}
}
.base-icon-button-with-count__icon {
	color: #d4d4d4;
	height: 2.125rem;
	width: 2.125rem;
	transition: color 0.2s ease-in-out;
	@media (max-width: $mobile-width) {
		color: #fff;
	}
}
.base-icon-button-with-count__count-wrapper {
	position: absolute;
	top: 0;
	right: 0;
	width: 1.25rem;
	height: 1.25rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background: #e4121f;
	outline: 0.0625rem solid #101011;
	padding-bottom: 0.1rem;
	padding-left: 0.05rem;
}
.base-icon-button-with-count__count {
	font-size: 0.875rem;
	font-weight: 800;
	color: #fff;
}
</style>
