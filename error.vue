<template>
	<NuxtLayout>
		<AppLayout>
			<HeaderSpacer />
			<div class="container">
				<h1>{{ error?.statusCode }} {{ error?.statusMessage }}</h1>
				<p>
					{{ error?.message }}
				</p>
				<div v-html="error?.stack"></div>
			</div>
		</AppLayout>
	</NuxtLayout>
</template>

<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue';

const error = useError();
</script>

<style scoped></style>
