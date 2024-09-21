<template>
	<label
		class="form-select-field"
		:class="[
			theme ? `${theme}-theme` : 'light-theme',
			{
				'is-focused': isFocused,
				'has-error': hasError,
				'is-valid': isValid && !hasError,
				required: required
			}
		]"
	>
		<select
			class="form-select-field__select"
			v-model="modelValue"
			:required="required || false"
			:name="name"
			@focus="isFocused = true"
			@blur="isFocused = false"
		>
			<option value="" selected disabled>
				{{ label }}
			</option>
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
				:label="option.label"
			>
				{{ option.label }}
			</option>
		</select>
		<SvgIcon
			name="select-field-arrow"
			class="form-select-field__select-arrow"
		/>
		<Transition name="fade">
			<span
				class="form-select-field__error-message"
				v-if="errorMessage && hasError"
			>
				{{ errorMessage }}
			</span>
		</Transition>
	</label>
</template>

<script setup lang="ts">
import type { ISelectFieldOption } from '~/types/TSelectFieldOption';

const props = defineProps<{
	label: string;
	name: string;
	required?: boolean;
	isValid?: boolean;
	errorMessage?: string;
	options: ISelectFieldOption[];
	theme?: 'light' | 'dark';
}>();
const modelValue = defineModel<string>();

const hasError = ref(false);
watchEffect(() => {
	if (props.errorMessage?.length && !props.isValid) hasError.value = true;
	else hasError.value = false;
});

const isFocused = ref(false);

// define on change emit and emit on modelValue change
const emit = defineEmits({
	change: (value: string) => {
		value;
		return true;
	}
});
watchEffect(() => {
	emit('change', modelValue.value || '');
});
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.form-select-field {
	border-radius: 0.125rem;
	position: relative;
	transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
	background: #f9f9f9;
	border: 0.0625rem solid #80868e;
	&.required::after {
		content: '*';
		display: block;
		font-size: 1rem;
		color: #ff0000;
		position: absolute;
		z-index: 1;
		top: 0.5rem;
		right: 0.5rem;
		transition: opacity 0.2s ease-in-out;
	}
	&.is-valid {
		border: 0.0625rem solid #e4121f;
	}
	&.is-valid::after {
		opacity: 0;
	}
	&.dark-theme {
		background: #292929;
		color: #fff;
	}
	&.has-error {
		color: #e4121f;
	}
}
.form-select-field__select {
	width: 100%;
	padding: 1.25rem 1.5rem;
	border: none;
	background: none;
	border: none;
	appearance: none;
	-webkit-appearance: none;
	@media (max-width: $middle-desktop-width) {
		font-size: 1.125rem;
	}
}
.form-select-field.dark-theme .form-select-field__select {
	color: #fff;
}
.form-select-field__error-message {
	background: #e4121f;
	padding: 0.1875rem 1.25rem;
	font-weight: 700;
	font-size: 0.875rem;
	position: absolute;
	bottom: 0;
	right: 0;
	color: #fff;
}
.form-select-field__select-arrow {
	position: absolute;
	top: 50%;
	right: 1.5rem;
	transform: translateY(-50%);
	width: 1rem;
	height: 1rem;
	right: 1.75rem;
	fill: #000;
	transition: fill 0.2s ease-in-out;
	pointer-events: none;
}
</style>
