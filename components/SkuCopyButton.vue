<template>
	<button
		class="product-page-sku-copy-button"
		@click="copy"
		:aria-label="$t('copy_code')"
	>
		<span>{{ $t('code') }}</span>
		<span class="color-black">
			{{ sku }}
		</span>
		<SvgIcon name="copy" class="product-page-sku-copy-button__icon" />
	</button>
</template>

<script setup lang="ts">
const props = defineProps<{
	sku: string;
}>();

const { t } = useI18n();

const copy = () => {
	try {
		navigator.clipboard.writeText(props.sku);
		alert(t('code_copied'));
	} catch (error) {
		alert(t('not_able_to_copy'));
	}
};
</script>

<style scoped lang="scss">
.product-page-sku-copy-button {
	display: flex;
	align-items: center;
	background: none;
	border: none;
	gap: 0.375rem;
	cursor: pointer;
	transition: color 0.2s;
	color: #80868e;
	font-size: 0.75rem;
	&:hover {
		color: #e4121f;
	}
}

.product-page-sku-copy-button__icon {
	width: 2rem;
	height: 2rem;
}
</style>
