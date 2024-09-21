<template>
	<component
		:is="buttonTag"
		class="base-button"
		:class="[`${theme}-theme`, size]"
		:href="href"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
const props = defineProps<{
	theme?: 'dark-form' | 'accent' | 'accent-bordered' | 'dark' | 'secondary';
	size?: 'small' | 'medium' | 'large';
	href?: string;
}>();

// Determine if the component should render as a <button> or <a> tag
const buttonTag = props.href ? 'a' : 'button';
</script>

<style scoped lang="scss">
.base-button {
	font-weight: 700;
	min-width: 10em;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	border-radius: 0.75em;
	border: 0.0625rem solid transparent;
	text-decoration: none;
	transition: border-color 0.2s ease, background-color 0.2s ease,
		color 0.2s ease;
	line-height: 100%;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Themes */
	&.accent-theme {
		background: #e4121f;
		color: #fff;
		&:hover:not(:disabled) {
			background: #570711;
			border-color: #e4121f;
		}
		&:active {
			color: #ddcccf;
			border-color: #570711 !important;
			background: #570711;
		}
	}

	&.accent-bordered-theme {
		background: transparent;
		color: #101011;
		border-color: #e4121f;
		&:hover:not(:disabled) {
			color: #e4121f;
		}
		&:active:not(:disabled) {
			background: #570711;
			border-color: #570711;
			color: #ddcccf;
		}
	}

	&.light-theme {
		background: #d4d4d4;
		color: #fff;
	}

	&.dark-theme {
		background: #101011;
		color: #fff;
		&:disabled {
			background: #d4d4d4;
			color: #fff;
		}
		&:hover:not(:disabled) {
			background: #e4121f;
		}
		&:active:not(:disabled) {
			background: #101011;
		}
	}

	&.dark-form-theme {
		background: rgba($color: #fff, $alpha: 0.16);
		color: #fff;
		&:hover:not(:disabled) {
			background: transparent;
			border-color: #e4121f;
		}
		&:active:not(:disabled) {
			color: #80868e;
		}
	}

	&.secondary-theme {
		background: #ededed;
		&:hover:not(:disabled) {
			background: #d4d4d4;
		}
		&:active:not(:disabled) {
			background: #ededed;
		}
	}

	/* Sizes */
	&.small {
		padding: 0.75em;
	}

	&.medium {
		padding: 1em;
	}

	&.large {
		padding: 1.25em;
	}
}
</style>
