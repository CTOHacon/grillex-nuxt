<template>
	<div class="range-field" ref="fieldRef">
		<button
			class="range-field__thumb range-field__thumb-start"
			ref="fromThumb"
			@mousedown="onThumbMouseDown('start')"
			@touchstart="onThumbTouchStart('start')"
			:style="{
				left: `${fromThumbLeftPosition}%`
			}"
		/>
		<div class="range-field__track"></div>
		<div
			class="range-field__range"
			:style="{
				left: fromThumbLeftPosition + '%',
				right: toThumbRightPosition + '%'
			}"
		></div>
		<button
			class="range-field__thumb range-field__thumb-end"
			ref="toThumb"
			@mousedown="onThumbMouseDown('end')"
			@touchstart="onThumbTouchStart('end')"
			:style="{
				right: `${toThumbRightPosition}%`
			}"
		/>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	min: number;
	max: number;
	step: number;
}>();

const valueFrom = defineModel<number>('from', {
	required: true
});

const valueTo = defineModel<number>('to', {
	required: true
});

const fieldRef = ref<HTMLDivElement | null>(null);
const fromThumb = ref<HTMLButtonElement | null>(null);
const toThumb = ref<HTMLButtonElement | null>(null);

const fromThumbLeftPosition = computed(() => {
	return ((valueFrom.value - props.min) / (props.max - props.min)) * 100;
});

const toThumbRightPosition = computed(() => {
	return ((props.max - valueTo.value) / (props.max - props.min)) * 100;
});

const handleThumbMove = (x: number, type: string) => {
	const fieldRect = fieldRef.value?.getBoundingClientRect();
	if (!fieldRect) return;

	const fieldWidth = fieldRect.width;
	const fieldLeft = fieldRect.left;
	const position = (x - fieldLeft) / fieldWidth;
	const value =
		Math.round(
			(props.min + (props.max - props.min) * position) / props.step
		) * props.step;

	if (type === 'start') {
		if (value >= valueTo.value) valueFrom.value = valueTo.value;
		else if (value < props.min) valueFrom.value = props.min;
		else valueFrom.value = value;
	} else {
		if (value <= valueFrom.value) valueTo.value = valueFrom.value;
		else if (value > props.max) valueTo.value = props.max;
		else valueTo.value = value;
	}
};

const onThumbMouseDown = (type: string) => {
	const onMouseMoveListener = (event: MouseEvent) => {
		const x = event.clientX;
		handleThumbMove(x, type);
	};

	const onMouseUpListener = () => {
		document.removeEventListener('mousemove', onMouseMoveListener);
		document.removeEventListener('mouseup', onMouseUpListener);
	};

	document.addEventListener('mousemove', onMouseMoveListener);
	document.addEventListener('mouseup', onMouseUpListener);
};

const onThumbTouchStart = (type: string) => {
	const onTouchMoveListener = (event: TouchEvent) => {
		const x = event.touches[0].clientX;
		handleThumbMove(x, type);
	};

	const onTouchEndListener = () => {
		document.removeEventListener('touchmove', onTouchMoveListener);
		document.removeEventListener('touchend', onTouchEndListener);
	};

	document.addEventListener('touchmove', onTouchMoveListener);
	document.addEventListener('touchend', onTouchEndListener);
};
</script>

<style scoped lang="scss">
.range-field {
	display: flex;
	align-items: center;
	position: relative;
	border-radius: 0.8125rem;
	width: 100%;
	height: 0.5rem;
}
.range-field__track {
	background: #d4d4d4;
	position: relative;
	z-index: 0;
	height: 0.25rem;
	width: 100%;
}
.range-field__range {
	border-radius: 0.8125rem;
	background: #101011;
	height: 0.25rem;
	position: absolute;
	z-index: 1;
}
.range-field__thumb {
	width: 0.75rem;
	height: 0.5rem;
	border-radius: 0.125rem;
	outline: 0.125em solid #fff;
	border: none;
	background: #e4121f;
	position: absolute;
	z-index: 3;
	top: 0;
	transform-origin: center center;
	transition: transform 0.2s ease-in-out;
	cursor: pointer;
}
.range-field__thumb-from {
	transform: translateX(-50%);
	&:hover {
		transform: scale(1.2) translateX(-50%);
	}
}
.range-field__thumb-end {
	transform: translateX(50%);
	&:hover {
		transform: scale(1.2) translateX(50%);
	}
}
</style>
