export type TFormFieldsToValidate = { [key: string]: boolean };

export default function useFormValidStatus() {
	const formFieldsToValidate = reactive<TFormFieldsToValidate>({});

	const isFormValid = computed(() => {
		return Object.values(formFieldsToValidate).every(value => value);
	});

	const toggleFieldValidity = (fieldName: string, isValid: boolean) => {
		formFieldsToValidate[fieldName] = isValid;
	};
	const isFieldValid = (fieldName: string): boolean => {
		return formFieldsToValidate[fieldName];
	};
	const removeFieldValidityCheck = (fieldName: string) => {
		delete formFieldsToValidate[fieldName];
	};

	return {
		formFieldsToValidate,
		toggleFieldValidity,
		isFieldValid,
		removeFieldValidityCheck,
		isFormValid
	};
}
