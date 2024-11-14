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
import useFavoritesStore from './store/useFavoritesStore';

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

const favoritesStore = useFavoritesStore();
onMounted(() => {
	favoritesStore.syncFavoritesWithServer();
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
			rel: 'preload',
			as: 'font',
			href: '/fonts/AADuke-Fill.woff2',
			type: 'font/woff2',
			crossorigin: 'anonymous'
		},
		{
			rel: 'preload',
			as: 'font',
			href: '/fonts/Mulish-cyr.woff2',
			type: 'font/woff2',
			crossorigin: 'anonymous'
		},
		{
			rel: 'preload',
			as: 'font',
			href: '/fonts/Mulish-latin.woff2',
			type: 'font/woff2',
			crossorigin: 'anonymous'
		}
	],
	style: [
		{
			innerHTML: `
@font-face {font-family: 'AA Duke'; src: url('/fonts/AADuke-Fill.woff2') format('woff2-variations');font-display: swap;font-weight: 100 800;}
@font-face {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 200 1000;
  src: url('/fonts/Mulish-cyr.woff2') format('woff2');
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
@font-face {
  font-family: 'Mulish';
  font-style: normal;
  font-weight: 200 1000;
  src: url('/fonts/Mulish-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`
		}
	]
});
</script>
