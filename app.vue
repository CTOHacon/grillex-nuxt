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

const { locale } = useI18n();
useLocaleStore().changeLocale(locale.value);

// const browserLocale = getBrowserLocale();
// const cookieLocale = getLocaleCookie();

// if (!cookieLocale) {
// 	localeStore.changeLocale(browserLocale || 'uk');
// } else {
// 	localeStore.changeLocale(cookieLocale || 'uk');
// }

const globalSettingsStore = useGlobalSettingsStorage();
if (import.meta.server) {
	await globalSettingsStore.fetch();
}
</script>
