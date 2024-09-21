<template>
	<BaseModal
		modal-name="catalog"
		:leave-header-space="true"
		:lock-scroll="true"
		class="catalog-modal"
	>
		<nav class="catalog-modal__inner-wrapper">
			<CatalogModalNavigation class="container" />
			<CatalogModalBrands class="container" />
		</nav>
	</BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue';
import CatalogModalBrands from './CatalogModalBrands.vue';
import CatalogModalNavigation from './CatalogModalNavigation.vue';
</script>

<style scoped lang="scss">
.catalog-modal__inner-wrapper {
	border-radius: 0px 0px 0.25rem 0.25rem;
	border-bottom: 0.25rem solid #d4d4d4;
	background: #fff;
	margin-left: auto;
	margin-right: auto;
	padding-top: 1rem;
	overflow-y: auto;
	max-height: calc(100vh - var(--header-height));
}
</style>
