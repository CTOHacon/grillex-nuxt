<template>
	<FormSelectField
		v-if="isVisible && field.type === 'select'"
		:name="name"
		:label="field.label"
		v-model="field.value"
		:is-valid="field.isValid"
		:required="field.validation !== undefined"
		:error-message="''"
		:options="field.options"
	/>
	<FormInputField
		v-else-if="isVisible && field.type === 'text'"
		:label="field.label"
		:name="name"
		v-model="field.value"
		:placeholder="field.placeholder"
		:is-valid="field.isValid"
		:required="field.validation !== undefined"
		:error-message="''"
	/>
</template>

<script lang="ts" setup>
import {
	useCheckoutFormStore,
	type TCheckoutField
} from '~/store/useCheckoutFormStore';
import FormInputField from './FormInputField.vue';
const checkoutStore = useCheckoutFormStore();

const props = defineProps<{
	name: string;
	field: TCheckoutField;
}>();

const isVisible = computed(() => {
	return props.field.isVisible === undefined ? true : props.field.isVisible;
});
</script>

<style></style>
