<template>
	<HeaderSpacer />
	<div class="container post-page-pre-content">
		<Breadcrumbs class="" />
		<CopyLinkButton :link="link" />
	</div>
	<div class="container post-main-layout mb-3">
		<main class="post-main-layout__main">
			<BlocksRenderer :blocks="webPage?.data.data.content || []" />
		</main>
		<aside class="post-main-layout__aside">
			<BaseTableOfContents
				class="post-main-layout__table-of-contents"
				:title="$t('contents_info')"
				:items="webPage?.data.data.table_of_contents || []"
			/>
		</aside>
	</div>
</template>

<script setup lang="ts">
import BaseTableOfContents from '~/components/BaseTableOfContents.vue';
import BlocksRenderer from '~/components/Blocks/BlocksRenderer.vue';
import Breadcrumbs from '~/components/Breadcrumbs.vue';
import CopyLinkButton from '~/components/CopyLinkButton.vue';
import HeaderSpacer from '~/components/HeaderSpacer.vue';
import usePostStore from '~/store/usePostStore';
import useWebPageStore from '~/store/useWebPageStore';
const router = useRouter();

const postStore = usePostStore();
await postStore.fetch();

const webPageStore = useWebPageStore();
const { data: webPage } = storeToRefs(webPageStore);

const link = router.currentRoute.value.fullPath;
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.post-page-pre-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
}
.post-main-layout {
	padding: 3rem;
	background: #fff;
	display: grid;
	grid-template-columns: 1fr 30.5rem;
	gap: 1rem;
	@media (max-width: $tablet-width) {
		grid-template-columns: 100%;
	}
	@media (max-width: $mobile-width) {
		padding: 1rem;
	}
}

.post-main-layout__main {
	& > *:not(:last-child) {
		margin-bottom: 1.25rem;
	}
}
.post-main-layout__aside {
	position: relative;
	@media (max-width: $tablet-width) {
		order: -1;
	}
}
.post-main-layout__table-of-contents {
	position: sticky;
	top: calc(var(--header-height) + 1rem);
}
</style>
