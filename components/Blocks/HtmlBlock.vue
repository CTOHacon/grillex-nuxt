<template>
	<div v-html="content" class="html-block post-content" />
</template>

<script setup lang="ts">
defineProps<{ content: any }>();
</script>

<style scoped></style>
