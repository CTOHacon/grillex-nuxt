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

useHead({
	link: [
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{
			rel: 'preconnect',
			href: 'https://fonts.gstatic.com',
			crossorigin: 'anonymous'
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Mulish:wght@200..1000&display=swap'
		},
		{
			rel: 'preload',
			href: '/AADuke-Fill.woff2',
			as: 'font',
			type: 'font/woff2',
			crossorigin: 'anonymous'
		}
	]
});
</script>
