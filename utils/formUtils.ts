export const fastMaskValidator = (
    valueToValidate: string,
    valueMask: string
): boolean => {
    const mask = valueMask.split('');
    const value = valueToValidate.split('');
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '#') {
            if (!/\d/.test(value[i])) {
                return false;
            }
        } else if (mask[i] !== value[i]) {
            return false;
        }
    }
    return true;
};

export const phoneMask = '+38(0##) ###-##-##';
export const phoneMaskValidator = (value: string) =>
    fastMaskValidator(value, phoneMask);

export const phoneValidator = (value: string) => {
    return value.length > 9;
}

export const emailValidator = (value: string) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
