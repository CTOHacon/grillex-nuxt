<template>
	<Transition name="fade">
		<KeepAlive>
			<div
				ref="modalRef"
				class="base-modal"
				:class="class"
				v-show="isModalActive"
			>
				<slot />
			</div>
		</KeepAlive>
	</Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import useModalStateStore from '~/store/useModalStateStore';
import type TModalTypes from '~/types/TModalTypes';

// Props
const props = defineProps<{
	modalName: TModalTypes;
	lockScroll?: boolean;
	leaveHeaderSpace?: boolean;
	class?: string;
}>();

// Stores
const modalStateStore = useModalStateStore();

// Modal state
const isModalActive = computed(() =>
	modalStateStore.isActiveModal(props.modalName)
);

// References
const modalRef = ref<HTMLElement | null>(null);

// Handle locking/unlocking scroll based on modal state
const handleLockScroll = (activeModal: TModalTypes | null) => {
	// if (activeModal && props.lockScroll) {
	// 	document.documentElement.classList.add('overflow-hidden');
	// } else {
	// 	document.documentElement.classList.remove('overflow-hidden');
	// }
};

// Handle click outside the modal inner to close it
const handleClickOutside = (e: MouseEvent) => {
	if (modalRef.value && e.target === modalRef.value) {
		modalStateStore.toggleModal(props.modalName);
	}
};

// Set up event listeners
onMounted(() => {
	modalRef.value?.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
	modalRef.value?.removeEventListener('click', handleClickOutside);
});

// Watch for changes in modal state
watch(() => modalStateStore.activeModal, handleLockScroll);
</script>

<style scoped lang="scss">
.base-modal {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	z-index: 10;
	background: rgba(0, 0, 0, 0.2);
	top: var(--header-height); // If leaveHeaderSpace is true, adjust this.
}
</style>
