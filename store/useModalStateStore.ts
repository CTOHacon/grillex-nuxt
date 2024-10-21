import type TModalTypes from "~/types/TModalTypes";

const useModalStateStore = defineStore('modalState', () => {
    const activeModal = ref<TModalTypes>(null);
    const toggleModal = (modal: TModalTypes = null) => {
        activeModal.value = modal === activeModal.value ? null : modal;
    };
    const openModal = (modal: TModalTypes) => {
        activeModal.value = modal;
    }
    const isActiveModal = (modal: TModalTypes) =>
        activeModal.value === modal;

    return {
        activeModal,
        toggleModal,
        openModal,
        isActiveModal
    };
});

export default useModalStateStore;