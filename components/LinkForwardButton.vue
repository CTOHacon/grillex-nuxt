<template>
	<component
		:is="href ? 'a' : 'span'"
		:href="props.href"
		class="link-forward-button"
	>
		<slot />
		<SvgIcon class="link-forward-button__icon" name="link-decoration" />
	</component>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

const props = defineProps<{
	href?: string;
}>();
</script>

<style scoped lang="scss">
.link-forward-button {
	display: flex;
	align-items: center;
	text-decoration: none;
	transition: color 0.2s ease-in-out;
	color: currentColor;
	font-size: 1.125em;
	font-weight: 700;
	padding: 1em 1.5em;
	&:hover {
		color: #e4121f;
	}
}
.link-forward-button__icon {
	width: 1.5em;
	height: 1.5em;
	margin-left: 0.5rem;
}
</style>
