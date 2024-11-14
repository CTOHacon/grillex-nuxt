<template>
	<BaseIconButtonWithCount
		icon="like"
		:count="favoritesStore.favoritesQuantity.value"
		href="/favorites"
		:area-label="$t('favorites')"
	/>
</template>

<script setup lang="ts">
import useFavoritesStore from '~/store/useFavoritesStore';
import BaseIconButtonWithCount from './BaseIconButtonWithCount.vue';

const favoritesStore = useFavoritesStore();
</script>

<style scoped lang="scss"></style>
