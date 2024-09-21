<template>
	<form class="basic-contact-form">
		<div class="basic-contact-form__layout">
			<div class="basic-contact-form__left-column">
				<FormInputField
					:label="$t('name')"
					v-model="form.name"
					:placeholder="$t('your_name')"
					:validation="
						value => toggleFieldValidity('name', value.length > 3)
					"
					:required="true"
					:is-valid="isFieldValid('name')"
					:error-message="fieldHasError('name')"
					name="name"
					:theme="theme"
				/>
				<FormInputField
					:label="$t('surname')"
					v-model="form.surName"
					:placeholder="$t('your_surname')"
					:validation="
						value =>
							toggleFieldValidity('surName', value.length > 3)
					"
					:required="true"
					:is-valid="isFieldValid('surName')"
					:error-message="fieldHasError('surName')"
					name="surName"
					:theme="theme"
				/>
				<FormInputField
					:label="$t('phone')"
					v-model="form.phone"
					:placeholder="phoneMask"
					:validation="
						value => {
							const valid = phoneValidator(value);
							toggleFieldValidity('phone', valid);
						}
					"
					:required="true"
					:is-valid="isFieldValid('phone')"
					:error-message="fieldHasError('phone')"
					name="phone"
					:mask="phoneMask"
					:theme="theme"
				/>
				<FormInputField
					:label="$t('email')"
					v-model="form.email"
					:placeholder="$t('your_email')"
					:validation="
						value =>
							toggleFieldValidity('email', emailValidator(value))
					"
					:error-message="fieldHasError('email')"
					:required="true"
					:is-valid="isFieldValid('email')"
					name="email"
					:theme="theme"
				/>
			</div>
			<div class="basic-contact-form__right-column">
				<FormTextareaField
					name="comment"
					:error-message="''"
					:is-valid="true"
					:label="$t('comment')"
					:placeholder="$t('your_comment')"
					:required="false"
					:theme="theme"
					v-model="form.comment"
					class="basic-contact-form__comment"
				/>
			</div>
		</div>
		<BaseButton
			size="large"
			@click.prevent="submitForm"
			:theme="theme === 'dark' ? 'dark-form' : 'dark'"
		>
			{{ $t('send') }}
		</BaseButton>
	</form>
</template>

<script setup lang="ts">
import FormInputField from './FormInputField.vue';
import FormTextareaField from './FormTextareaField.vue';
import BaseButton from './BaseButton.vue';
import { emailValidator, phoneMask, phoneValidator } from '@/utils/formUtils';
import storeMainContactFormSubmission from '~/service/storeMainContactFormSubmission';

defineProps<{
	theme: 'light' | 'dark';
}>();

const form = reactive({
	name: '',
	surName: '',
	phone: '',
	email: '',
	comment: ''
});

const { isFormValid, toggleFieldValidity, isFieldValid } = useFormValidStatus();

const formErrorMessages = ref<{
	[key: string]: string;
}>({});

const fieldHasError = (field: string) => {
	return formErrorMessages.value[field];
};

const submitForm = async () => {
	try {
		formErrorMessages.value = {};
		await storeMainContactFormSubmission(form);
		location.href = '/thank-you';
	} catch (error: any) {
		const errors = error.response?._data?.errors;
		if (!errors) return;
		Object.keys(errors).forEach(key => {
			toggleFieldValidity(key, false);
			formErrorMessages.value[key] = errors[key].join(', ');
		});
	}
};
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.basic-contact-form .grid {
	@media (max-width: $tablet-width) {
		gap: 0.25rem !important;
	}
}
.basic-contact-form__layout {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.5rem;
	margin-bottom: var(--size-3);
	@media (max-width: $tablet-width) {
		gap: 0.25rem;
	}
	@media (max-width: $mobile-width) {
		grid-template-columns: 1fr;
	}
}

.basic-contact-form__left-column {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.basic-contact-form__comment {
	height: 100%;
}
</style>
