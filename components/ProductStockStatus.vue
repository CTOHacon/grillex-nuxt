<template>
	<p
		class="prdoduct-page-stock-status"
		:class="{
			'_in-stock': stock > 0,
			'_out-of-stock': stock === 0
		}"
	>
		<template v-if="stock">
			<span class="prdoduct-page-stock-status__in-stock">{{
				$t('in_stock')
			}}</span>
		</template>
		<template v-else>
			<span class="prdoduct-page-stock-status__out-of-stock">{{
				$t('out_of_stock')
			}}</span>
		</template>
	</p>
</template>

<script setup lang="ts">
const props = defineProps<{
	stock: number;
}>();
</script>

<style scoped lang="scss">
.prdoduct-page-stock-status {
	font-size: 1rem;
	line-height: 2rem;
	font-weight: 700;
	&._in-stock {
		color: #e4121f;
	}
	&._out-of-stock {
		color: #80868e;
	}
}
</style>
