<template>
	<AppLayout>
		<WebPageComponent />
	</AppLayout>
</template>

<script setup lang="ts">
import useWebPageStore from '~/store/useWebPageStore';
import useMediaFilesStore from '~/store/useMediaFilesStore';
import AppLayout from '~/layouts/AppLayout.vue';
import WebPageComponent from '~/components/WebPageComponent.vue';
import setup404Response from '~/utils/setup404Response';

const webPageStore = useWebPageStore();

if (import.meta.server) {
	await webPageStore.fetch();
	if (!webPageStore.data) setup404Response('No web page found');
}

const { data: webPage } = storeToRefs(webPageStore);

const i18nHead = useLocaleHead({
	addSeoAttributes: true
});

const mediaFilesStore = useMediaFilesStore();
const { getSizeUrl: getOgImageSizeUrl } = mediaFilesStore.useMediaFile(
	webPage.value?.seo?.og_image || ''
);
await mediaFilesStore.loadMediaFiles();
const ogImageUrl = getOgImageSizeUrl('thumbnail');

useHead({
	title: webPage.value?.seo?.title,
	htmlAttrs: {
		lang: i18nHead.value.htmlAttrs!.lang
	},
	link: [...(i18nHead.value.link || [])],
	meta: [
		...(i18nHead.value.meta || []),
		{
			name: 'description',
			content: webPage.value?.seo?.description
		},
		{
			name: 'robots',
			content: webPage.value?.seo?.robots
		},
		{
			property: 'og:image',
			content: ogImageUrl
		}
	],
	script: [
		{
			textContent: webPage.value?.seo?.custom_head_code || ''
		}
	]
});
</script>

<style scoped></style>
