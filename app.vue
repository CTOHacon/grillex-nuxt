<template>
	<NuxtLayout>
		<NuxtLoadingIndicator />
		<NuxtPage
	/></NuxtLayout>
</template>

<script setup lang="ts">
import useLocaleStore from './store/useLocaleStore';
import useGlobalSettingsStorage from './store/useGlobalSettingsStore';
import './styles/app.scss';
import useCartStore from './store/useCartStore';
import useFavouritesStore from './store/useFavouritesStrore';

const { locale } = useI18n();
useLocaleStore().changeLocale(locale.value);

const globalSettingsStore = useGlobalSettingsStorage();
if (import.meta.server) {
	await globalSettingsStore.fetch();
}

const cartStore = useCartStore();
onMounted(() => {
	cartStore.syncCartWithServer();
});

const favoutitesStore = useFavouritesStore();
onMounted(() => {
	favoutitesStore.syncFavouritesWithServer();
});
</script>
