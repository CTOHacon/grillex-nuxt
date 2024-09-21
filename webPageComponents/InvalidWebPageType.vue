<template>
	<AppLayout>
		<HeaderSpacer />
		<div class="container">
			<h1>
				Unexisting page type - {{ webPageStore.data?.type }} in a
				{{ webPageStore.data?.path }} page
			</h1>
		</div>
	</AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '~/layouts/AppLayout.vue';
import useWebPageStore from '~/store/useWebPageStore';

const webPageStore = useWebPageStore();
</script>

<style scoped></style>
