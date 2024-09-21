<template>
	<div class="base-collapsible-content" :class="{ isCollapsed }">
		<div
			class="base-collapsible-content__inner-wrapper"
			:class="{ collapsedContentShouldBeVisible, isCollapsed }"
			:style="{
				maxHeight: isCollapsed
					? closedHeight + 'px'
					: innerHeight + 'px'
			}"
		>
			<div
				class="base-collapsible-content__inner"
				ref="innerRef"
				:class="innerClass"
			>
				<slot />
			</div>
		</div>
		<button
			v-if="canBeCollapsed"
			class="base-collapsible-content__button"
			@click="onCollapseButtonClick"
		>
			{{ isCollapsed ? $t('read_full') : $t('collapse') }}
		</button>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watchEffect } from 'vue';

const props = defineProps<{
	innerClass?: string;
	closedHeight?: number;
}>();

const isCollapsed = ref(true);

// This is a workaround to make the content visible when the user clicks on the table of contents
const collapsedContentShouldBeVisible = inject<Ref<boolean>>(
	'collapsedContentShouldBeVisible'
);
watchEffect(() => {
	if (collapsedContentShouldBeVisible?.value) {
		isCollapsed.value = false;
		setTimeout(() => {
			collapsedContentShouldBeVisible.value = false;
		}, 150);
	}
});

const canBeCollapsed = ref(true);
const innerRef = ref<HTMLElement | null>(null);
const innerHeight = ref(0);

const closedHeight = props.closedHeight || 200;

const setupInnerHeight = () => {
	if (innerRef.value) innerHeight.value = innerRef.value.scrollHeight;
	if (innerHeight.value < closedHeight) canBeCollapsed.value = false;
};

onMounted(() => {
	setupInnerHeight();
});

const onCollapseButtonClick = () => {
	setupInnerHeight();
	isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped lang="scss">
.base-collapsible-content {
	position: relative;
}
.base-collapsible-content__button {
	font-weight: 800;
	margin-top: 2.5rem;
	transition: margin-top 0.2s ease-in-out;
	border: none;
	background: none;
	padding-bottom: 0.125rem;
	border-bottom: 0.0625rem solid #afbacc;
	transition: border-color 0.2s ease-in-out;
	cursor: pointer;
	&:hover {
		border-color: currentColor;
	}
}
.base-collapsible-content__inner-wrapper {
	transition: max-height 0.3s;
	overflow: hidden;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2rem;
		background: linear-gradient(rgba(255, 255, 255, 0), #fff);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s;
	}
	&.isCollapsed::after {
		opacity: 1;
	}
	&.collapsedContentShouldBeVisible {
		transition: none;
	}
}
.base-collapsible-content__inner {
	box-sizing: content-box;
}
</style>
