import { reactive, computed, ref, watch } from 'vue';
import { useApi } from '~/service/API';
import { useI18n } from 'vue-i18n';
import type { TSelectFieldOption } from '~/types/TSelectFieldOption';
import useCartStore from './useCartStore';

export type TCheckoutField = {
    value: string;
    label: string;
    placeholder?: string;
    type: 'select' | 'text' | 'textarea';
    options?: TSelectFieldOption[];
    isValid: boolean;
    validation?: (value: string) => boolean;
    isVisible: boolean;
    visibleCondition?: (form: Record<string, TCheckoutField>) => boolean;
}

export const useCheckoutFormStore = () => {
    const { t } = useI18n();
    const { api } = useApi();
    const cart = useCartStore();

    // Form schema to define the structure and validations
    const formSchema = reactive<Record<string, TCheckoutField>>({
        customer_name: {
            value: '',
            label: t('name'),
            placeholder: t('your_name'),
            type: 'text',
            isValid: false,
            validation: (value: string) => value.length > 2,
            isVisible: true,
        },
        customer_surname: {
            value: '',
            label: t('surname'),
            placeholder: t('your_surname'),
            type: 'text',
            isValid: false,
            validation: (value: string) => value.length > 2,
            isVisible: true,
        },
        customer_phone: {
            value: '',
            label: t('phone'),
            placeholder: t('your_phone'),
            type: 'text',
            isValid: false,
            validation: (value: string) => value.length > 9,
            isVisible: true,
        },
        customer_email: {
            value: '',
            label: t('email'),
            placeholder: t('your_email'),
            type: 'text',
            isValid: false,
            validation: (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),
            isVisible: true,
        },
        customer_message: {
            value: '',
            label: t('message'),
            placeholder: t('your_message'),
            type: 'textarea',
            isValid: true,
            isVisible: true,
        },
        shipping_provider: {
            value: '',
            label: t('shipping_provider'),
            type: 'select',
            options: [
                { label: t('self_pickup'), value: 'self_pickup' },
                { label: t('nova_poshta'), value: 'nova_poshta' },
                { label: 'Mest', value: 'mest' },
                { label: t('ukr_poshta'), value: 'ukr_poshta' },
            ],
            isValid: false,
            validation: (value: string) => value !== '',
            isVisible: true,
        },
        shipping_method: {
            value: '',
            label: t('shipping_method'),
            type: 'select',
            options: [
                { label: t('courier'), value: 'courier' },
                { label: t('department'), value: 'department' },
                { label: t('postal_machine'), value: 'postal_machine' },
            ],
            isValid: false,
            validation: (value: string) => value !== '',
            isVisible: false,
            visibleCondition: (form) => form.shipping_provider.value !== '' && form.shipping_provider.value !== 'self_pickup',
        },
        shipping_town: {
            value: '',
            label: t('town'),
            placeholder: t('your_town'),
            type: 'text',
            isValid: false,
            validation: (value: string) => value.length > 2,
            isVisible: false,
            visibleCondition: (form) => form.shipping_method.value !== '',
        },
        shipping_area: {
            value: '',
            label: t('region'),
            placeholder: t('your_region'),
            type: 'text',
            isValid: false,
            validation: (value: string) => value.length > 3,
            isVisible: false,
            visibleCondition: (form) => form.shipping_method.value !== '',
        },
        shipping_address: {
            value: '',
            label: t('address'),
            placeholder: t('your_address'),
            type: 'text',
            isValid: false,
            validation: (value: string) => value.length > 4,
            isVisible: false,
            visibleCondition: (form) => form.shipping_method.value === 'courier',
        },
        shipping_department: {
            value: '',
            label: t('department'),
            placeholder: t('your_department'),
            type: 'text',
            isValid: false,
            validation: (value: string) => value.length > 4,
            isVisible: false,
            visibleCondition: (form) => form.shipping_method.value === 'department',
        },
        shipping_postal_machine: {
            value: '',
            label: t('postal_machine'),
            placeholder: t('your_postal_machine'),
            type: 'text',
            isValid: false,
            validation: (value: string) => value.length > 3,
            isVisible: false,
            visibleCondition: (form) => form.shipping_method.value === 'postal_machine',
        },
        payment_method: {
            value: 'on_receive',
            label: t('payment_methods'),
            type: 'select',
            options: [{ label: t('on_receive'), value: 'on_receive' }],
            isValid: true,
            validation: (value: string) => value !== '',
            isVisible: true,
        },
    });

    const formIsValid = ref(false);

    watch(formSchema, () => {
        let isValid = true;
        Object.keys(formSchema).forEach((fieldKey) => {
            let field: TCheckoutField = formSchema[fieldKey];

            if (field.validation) {
                field.isValid = field.validation(field.value || '');
            }
            if (field.visibleCondition) {
                field.isVisible = field.visibleCondition(formSchema);
            }
            if (field.isVisible && !field.isValid) {
                isValid = false;
            }
        });
        formIsValid.value = isValid;
    }, {
        deep: true,
        immediate: true,
    });

    const getSubmitData = () => {
        return {
            customer_name: formSchema.customer_name.value,
            customer_surname: formSchema.customer_surname.value,
            customer_phone: formSchema.customer_phone.value,
            customer_email: formSchema.customer_email.value,
            customer_message: formSchema.customer_message.value,
            shipping_provider: formSchema.shipping_provider.value,
            shipping_method: formSchema.shipping_method.value,
            shipping_town: formSchema.shipping_town.value,
            shipping_area: formSchema.shipping_area.value,
            shipping_address: formSchema.shipping_address.value,
            shipping_department: formSchema.shipping_department.value,
            shipping_postal_machine: formSchema.shipping_postal_machine.value,
            payment_method: formSchema.payment_method.value,

            cart: cart.cartItems.value
        };
    };

    const submitForm = async () => {
        const data = getSubmitData();

        try {
            const response = await api<any>(`/orders`, {
                method: 'POST',
                body: data,
            });
            if (response) {
                cart.clearCart();
                location.href = '/thank-you?order_id=' + response.data.id;
            }
        } catch (error) {
            alert('Error ' + error);
        }
    }

    return {
        formSchema,
        formIsValid,
        getSubmitData,
        submitForm,
    };
};
