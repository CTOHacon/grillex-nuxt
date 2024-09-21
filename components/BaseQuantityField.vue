<template>
	<div class="quantity-field" :class="{ disabled }">
		<button
			class="quantity-field__control-button"
			@click="decrement"
			:disabled="isDecrementDisabled"
		>
			–
		</button>
		<input
			class="quantity-field__input"
			type="text"
			:value="modelValue"
			@change="onInputChange"
		/>

		<button
			class="quantity-field__control-button"
			@click="increment"
			:disabled="isIncrementDisabled"
		>
			+
		</button>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Props definition
const props = defineProps<{
	disabled?: boolean;
	modelValue: number;
	max?: number;
	min?: number;
}>();

// Emit function for updating model value
const emit = defineEmits({
	'update:modelValue': (value: number) => value
});

// Computed properties for min and max with default values
const max = computed(() => props.max ?? Infinity);
const min = computed(() => props.min ?? 0);

// Computed properties for button states
const isDecrementDisabled = computed(() => props.modelValue <= min.value);
const isIncrementDisabled = computed(() => props.modelValue >= max.value);

// Function to handle input change
const onInputChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const sanitizedValue = target.value.replace(/\D/g, '');
	const value = Number(sanitizedValue);

	if (sanitizedValue.length === 0) return;

	if (value > max.value) {
		emit('update:modelValue', max.value);
	} else if (value < min.value) {
		emit('update:modelValue', min.value);
	} else {
		emit('update:modelValue', value);
	}
};

// Increment and Decrement Functions
const increment = () => {
	if (!isIncrementDisabled.value) {
		emit('update:modelValue', props.modelValue + 1);
	}
};

const decrement = () => {
	if (!isDecrementDisabled.value) {
		emit('update:modelValue', props.modelValue - 1);
	}
};
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';

.quantity-field {
	display: flex;
	align-items: center;
	gap: 0.5em;
	transition: opacity 0.2s ease-in-out;

	&.disabled {
		opacity: 0.5;
		pointer-events: none;
	}
}

.quantity-field__control-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2em;
	height: 2em;
	font-weight: 900;
	border-radius: 0.75em;
	border: 0.0625rem solid #101011;
	color: #101011;
	transition: border 0.2s ease-in-out, opacity 0.2s ease-in-out,
		color 0.2s ease-in-out;
	background: none;
	cursor: pointer;
	padding-bottom: 0.2em;

	&:hover {
		border: 0.0625rem solid #e4121f;
		color: #e4121f;
	}

	&:active {
		border: 0.0625rem solid rgba($color: #e4121f, $alpha: 0.32);
	}

	&:disabled {
		border: 0.0625rem solid rgba(149, 149, 150, 0.24);
		opacity: 0.25;
		pointer-events: none;
		cursor: not-allowed;
	}
}

.quantity-field__input {
	border-radius: 0.75em;
	border: 0.0625rem solid #80868e;
	padding: 0.25em;
	width: 2.625em;
	height: 2em;
	text-align: center;
	color: currentColor;
	font-weight: 600;
	line-height: 100%;
	appearance: none;

	@media (max-width: $mobile-width) {
		width: 3.75em;
		font-size: 1.125em;
		margin: 0 0.25rem;
	}
}
</style>
