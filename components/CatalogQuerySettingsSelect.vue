<template>
	<div class="catalog-settings-select" :class="{ _opened: isOpened }">
		<label class="catalog-settings-select__label" @click="toggleDropdown">
			{{ label }}
		</label>
		<div class="catalog-settings-select__select-wrapper">
			<button
				class="catalog-settings-select__select-head"
				@click="toggleDropdown"
				:aria-expanded="isOpened"
				:aria-controls="'dropdown-' + id"
				aria-haspopup="listbox"
			>
				<span class="catalog-settings-select__select-head-text">
					{{
						options.find(option => option.value === model)?.label ||
						'Оберіть'
					}}
				</span>
				<SvgIcon
					name="catalog-settings-select-arrow"
					class="catalog-settings-select__select-toggle-icon"
				/>
			</button>
			<Transition name="fade">
				<ul
					v-show="isOpened"
					:id="'dropdown-' + id"
					class="catalog-settings-select__select-options"
					role="listbox"
					aria-labelledby="select-label"
				>
					<template v-for="option in options" :key="option.value">
						<li
							v-if="option.value !== model"
							class="catalog-settings-select__select-option"
							@click="onOptionSelect(option.value)"
							role="option"
							:aria-selected="option.value === model"
							tabindex="0"
						>
							{{ option.label }}
						</li>
					</template>
				</ul>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from './SvgIcon.vue';

const props = defineProps<{
	label: string;
	id?: string;
	options: {
		value: string | number;
		label: string;
	}[];
}>();

const isOpened = ref(false);
const model = defineModel<string | number>({ required: true });

const toggleDropdown = () => {
	isOpened.value = !isOpened.value;
};

const onOptionSelect = (value: string | number) => {
	model.value = value;
	isOpened.value = false;
};
</script>

<style scoped lang="scss">
.catalog-settings-select {
	display: flex;
	align-items: center;
	position: relative;
}
.catalog-settings-select__label {
	padding: 0.5rem 0.5rem 0.5rem 0;
	cursor: pointer;
}
.catalog-settings-select__select-wrapper {
	position: relative;
}
.catalog-settings-select__select-head {
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 700;
	padding: 0.75rem 0.25rem 0.75rem 0.5rem;
	text-align: center;
	border-bottom: 0.125rem solid #d4d4d4;
	user-select: none;
	cursor: pointer;
	width: 100%;
}
.catalog-settings-select__select-head-text {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.catalog-settings-select__select-toggle-icon {
	flex: 0 0 1rem;
	width: 1rem;
	height: 1rem;
	margin-left: 0.5rem;
	transform: rotate(0deg);
	transition: transform 0.3s ease;
}
.catalog-settings-select._opened .catalog-settings-select__select-toggle-icon {
	transform: rotate(180deg);
}

.catalog-settings-select__select-options {
	position: absolute;
	left: 0;
	top: 100%;
	background: #fff;
	border-bottom-left-radius: 0.125rem;
	border-bottom-right-radius: 0.125rem;
	padding: 0.4rem 0;
	min-width: 100%;
	z-index: 10;
}
.catalog-settings-select__select-option {
	padding: 0.4rem 0.5rem;
	transition: background 0.3s ease;
	cursor: pointer;
	&:hover {
		background: #ededed;
	}
}
</style>
