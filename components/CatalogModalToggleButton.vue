<template>
	<button
		class="catalog-modal-togle-button"
		aria-label="Каталог"
		type="button"
		:class="{
			_active: modalState.isActiveModal('catalog')
		}"
		@click="modalState.toggleModal('catalog')"
	>
		<SvgIcon class="catalog-modal-togle-button__icon" name="catalog" />
		{{ $t('catalog') }}
	</button>
</template>

<script setup lang="ts">
import useModalStateStore from '@/store/useModalStateStore';

const modalState = useModalStateStore();
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.catalog-modal-togle-button {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	border-radius: 0.75rem;
	padding: 0 1.1875rem;
	color: #fff;
	min-width: 12.1875rem;
	height: var(--button-height);
	font-weight: 700;
	line-height: 100%;
	transition: height 0.2s ease-in-out, background 0.2s ease-in-out,
		border-color 0.2s ease-in-out;
	cursor: pointer;
	outline: none;

	border: 0.0625rem solid rgba(228, 18, 31, 0.64);
	&:hover {
		border-color: rgba(228, 18, 31, 1);
	}
	&._active {
		background: rgba(228, 18, 31, 1);
		border-color: rgba(228, 18, 31, 1);
	}

	@media (max-width: $tablet-width) {
		padding: 0 0.75rem;
		height: 2.625rem;
	}
	@media (max-width: $mobile-width) {
		min-width: unset;
	}
}
.catalog-modal-togle-button__icon {
	width: calc(var(--button-height) - 1.5rem);
	height: calc(var(--button-height) - 1.5rem);
	transition: transform 0.2s ease-in-out;
	@media (max-width: $tablet-width) {
		width: 1.5rem;
		height: 1.5rem;
	}
}
</style>
