<template>
	<Header />
	<CatalogModal />
	<CartModal />
	<SearchModal />
	<slot />
	<BottomNavigationBar />
	<Footer />
</template>

<script setup lang="ts">
import SearchModal from '~/components/SearchModal.vue';
</script>

<style scoped></style>
