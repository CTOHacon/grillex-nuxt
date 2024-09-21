<template>
	<label
		class="form-input-field"
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
		<span class="form-input-field__label">{{ label }}</span>
		<input
			class="form-input-field__input"
			:type="type || 'text'"
			:placeholder="placeholder"
			v-model="modelValue"
			@update:model-value="validation ? validation($event) : $event"
			:required="required || false"
			:name="name"
			@focus="isFocused = true"
			@blur="isFocused = false"
		/>
		<SvgIcon name="form-valid-tip" class="form-input-field__valid-tip" />
		<!-- <Transition name="fade">
			<span
				class="form-input-field__error-message"
				v-if="errorMessage && hasError"
			>
				{{ errorMessage }}
			</span>
		</Transition> -->
	</label>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

const props = defineProps<{
	label: string;
	name: string;
	placeholder: string | undefined;
	required?: boolean;
	isValid?: boolean;
	errorMessage?: string;
	mask?: string;
	type?: string;
	theme?: 'light' | 'dark';
	validation?: (value: string) => void;
}>();
const modelValue = defineModel<string>();

const hasError = ref(false);
watchEffect(() => {
	if (props.validation) props.validation(modelValue.value || '');
	if (props.errorMessage?.length && !props.isValid) hasError.value = true;
	else hasError.value = false;
});

const isFocused = ref(false);
</script>
<style scoped lang="scss">
@import '~/styles/variables.scss';
.form-input-field {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 0 1.5rem;
	height: 3.625rem;
	border-radius: 0.125rem;
	position: relative;
	transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
	@media (max-width: $mobile-width) {
		padding: 1rem;
	}
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
	&.is-valid::after {
		opacity: 0;
	}
	&.dark-theme {
		background: #292929;
		color: #fff;
	}
	&.light-theme {
		background: #f9f9f9;
		color: #000;
	}
	&.has-error {
		color: #e4121f;
	}
}
.form-input-field__label {
	font-weight: 500;
	flex: 0 0 6rem;
	@media (max-width: $mobile-width) {
		flex: 0 0 4.375rem;
		font-size: 0.875rem;
	}
}
.form-input-field__input {
	flex: 1;
	padding: 0.5rem 0;
	border: none;
	background: none;
	border: none;
	@media (max-width: $middle-desktop-width) {
		font-size: 1.125rem;
	}
}
.form-input-field.dark-theme .form-input-field__input {
	color: #fff;
	&::placeholder {
		color: #80868e;
	}
}
.form-input-field.has-error .form-input-field__input::placeholder {
	color: #e4121f !important;
}

.form-input-field__valid-tip {
	position: absolute;
	top: 0.5625rem;
	right: 0.5rem;
	width: 1.125rem;
	height: 1.125rem;
	transform: translateY(-50%);
	opacity: 0;
	transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}
.form-input-field.is-valid .form-input-field__valid-tip {
	opacity: 1;
	transform: translateY(0%);
}
.form-input-field__error-message {
	background: #e4121f;
	padding: 0.1875rem 1.25rem;
	font-weight: 700;
	font-size: 0.875rem;
	position: absolute;
	bottom: 0;
	right: 0;
	color: #fff;
}
</style>
