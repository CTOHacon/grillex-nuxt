<template>
	<component v-if="webPageComponent" :is="webPageComponent" />
</template>

<script lang="ts" setup>
const { webPageComponent } = useWebPageComponent();
</script>

<style></style>
