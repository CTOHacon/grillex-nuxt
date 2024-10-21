<template>
	<BaseIconButtonWithCount
		icon="like"
		:count="favoutitesStore.favouritesQuantity.value"
		href="#"
		:area-label="$t('favorites')"
	/>
</template>

<script setup lang="ts">
import useFavouritesStore from '~/store/useFavouritesStrore';
import BaseIconButtonWithCount from './BaseIconButtonWithCount.vue';

const favoutitesStore = useFavouritesStore();
</script>

<style scoped lang="scss"></style>
