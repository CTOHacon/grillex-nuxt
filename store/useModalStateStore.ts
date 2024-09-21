import type TModalTypes from "~/types/TModalTypes";

const useModalStateStore = defineStore('modalState', () => {
    const activeModal = ref<TModalTypes>(null);
    const toggleModal = (modal: TModalTypes = null) => {
        activeModal.value = modal === activeModal.value ? null : modal;
    };
    const isActiveModal = (modal: TModalTypes) =>
        activeModal.value === modal;

    return {
        activeModal,
        toggleModal,
        isActiveModal
    };
});

export default useModalStateStore;