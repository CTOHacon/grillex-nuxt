import type { TMainContactFormSubmission } from "~/types/TMainContactFormSubmission";
import { useApi } from "./API";

const storeMainContactFormSubmission = async (data: TMainContactFormSubmission) => {
    const { api } = useApi();

    console.log('Submiting: ', data)
    return api(`/contact-form-submission/main-contact-form`, {
        method: 'POST',
        body: data,
        onRequest: () => {
            console.info('📤 Storing main contact form submission');
        }
    });
};

export default storeMainContactFormSubmission;