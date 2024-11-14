<template>
	<div class="bottom-navigation-bar">
		<div class="bottom-navigation-bar__buttons">
			<button
				class="bottom-navigation-bar__search-button"
				@click="modalStore.toggleModal('mobile-search')"
			>
				<SvgIcon
					class="bottom-navigation-bar__search-button"
					name="search"
				/>
			</button>
			<span class="bottom-navigation-bar__separator"></span>
			<HeaderFavoritesButton />
		</div>
		<CartModalToggleButton />
	</div>
</template>

<script setup lang="ts">
import useModalStateStore from '~/store/useModalStateStore';
import SvgIcon from './SvgIcon.vue';

const modalStore = useModalStateStore();
</script>

<style lang="scss">
@import '~/styles/variables.scss';
@media (max-width: $tablet-width) {
	:root {
		--bottom-navigation-bar-height: 4rem;
	}
}
</style>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.bottom-navigation-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	top: unset;
	width: 100%;
	background: #000;
	height: var(--bottom-navigation-bar-height);
	z-index: 9;
	color: #fff;
	display: none;
	justify-content: space-between;
	align-items: center;
	border-top: 0.0625rem solid #292929;
	padding: 0.8125rem;
	--button-height: 3rem;
	@media (max-width: $tablet-width) {
		font-size: 1rem;
		display: flex;
	}
}
.bottom-navigation-bar__buttons {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
.bottom-navigation-bar__separator {
	width: 0.125rem;
	height: 2.6875rem;
	opacity: 0.2;
	background: #d5d5d5;
}
.bottom-navigation-bar__search-button {
	width: 3rem;
	height: 3rem;
}
</style>
