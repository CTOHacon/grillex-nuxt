<template>
	<label
		class="form-textarea-field"
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
		<textarea
			class="form-textarea-field__textarea"
			:placeholder="placeholder"
			v-model="modelValue"
			:required="required || false"
			:name="name"
			@focus="isFocused = true"
			@blur="isFocused = false"
		/>
		<SvgIcon name="form-valid-tip" class="form-textarea-field__valid-tip" />
		<Transition name="fade">
			<span
				class="form-textarea-field__error-message"
				v-if="errorMessage && hasError"
			>
				{{ errorMessage }}
			</span>
		</Transition>
	</label>
</template>

<script setup lang="ts">
const props = defineProps<{
	name: string;
	placeholder: string;
	required?: boolean;
	isValid?: boolean;
	errorMessage?: string;
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
.form-textarea-field {
	min-height: 7.625rem;
	display: block;
	gap: 0.75rem;
	padding: 1rem 1.5rem;
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
	}
	&.has-error {
		color: #e4121f;
	}
}
.form-textarea-field__textarea {
	height: 100%;
	width: 100%;
	padding: 0.5rem 0;
	border: none;
	background: none;
	border: none;
	resize: none;
}
.form-textarea-field.dark-theme .form-textarea-field__textarea {
	color: #fff;
	&::placeholder {
		color: #80868e;
	}
}
.form-textarea-field.has-error .form-textarea-field__textarea::placeholder {
	color: #e4121f !important;
}

.form-textarea-field__valid-tip {
	position: absolute;
	top: 0.5625rem;
	right: 0.5rem;
	width: 1.125rem;
	height: 1.125rem;
	transform: translateY(-50%);
	opacity: 0;
	transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}
.form-textarea-field.is-valid .form-textarea-field__valid-tip {
	opacity: 1;
	transform: translateY(0%);
}
.form-textarea-field__error-message {
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
