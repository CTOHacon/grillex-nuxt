<template>
	<button
		class="link-copy-button"
		@click="onCopy"
		:aria-label="$t('copy_code')"
	>
		<span class="color-black">{{ $t('copy_link') }}</span>
		<span class="link-copy-button__icon-wrapper">
			<SvgIcon
				name="copy"
				v-if="!copied"
				class="link-copy-button__icon"
			/>
			<SvgIcon
				name="tip-icon"
				v-else
				class="link-copy-button__success-icon"
			/>
		</span>
	</button>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';

const copied = ref(false);

const props = defineProps<{
	link: string;
}>();

const onCopy = () => {
	copied.value = true;
	copyToClipboard(props.link);
	setTimeout(() => {
		copied.value = false;
	}, 2000);
};
</script>

<style scoped lang="scss">
.link-copy-button {
	display: flex;
	align-items: center;
	background: none;
	border: none;
	gap: 0.375rem;
	cursor: pointer;
	transition: color 0.2s;
	font-size: 0.75rem;
	&:hover {
		color: #e4121f;
	}
}
.link-copy-button__icon-wrapper {
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
.link-copy-button__success-icon {
	width: 1rem;
	height: 1rem;
}
</style>
