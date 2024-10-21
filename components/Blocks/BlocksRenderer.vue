<template>
	<Block
		v-for="block in props.blocks"
		:key="block.id"
		:type="block.type"
		:data="block.data"
	/>
</template>

<script setup lang="ts">
import type { TBlock } from '~/types/TBlock';
import Block from './Block.vue';

const props = defineProps<{
	blocks: TBlock[];
}>();
</script>

<style scoped></style>
