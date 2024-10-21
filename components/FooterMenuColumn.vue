<template>
	<div class="footer-menu-column" :class="{ _active: active }">
		<p class="footer-menu-column__title" @click="active = !active">
			{{ column?.title }}
			<SvgIcon
				name="arrow-up"
				class="footer-menu-column__head-toggle-icon"
			/>
		</p>
		<ul class="footer-menu-column__list">
			<li v-for="(item, index) in column?.items" :key="index">
				<component
					:is="item.url ? 'a' : 'span'"
					:href="item.url"
					class="footer-menu-column__link"
				>
					{{ item.title }}
				</component>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TFooterMenuColumn } from '@/types/TFooterMenu';
import icons from '~/images/icons.svg';

defineProps<{
	column: TFooterMenuColumn;
}>();

const active = ref(false);
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';

.footer-menu-column {
	@media (max-width: $mobile-width) {
		font-size: 1.125rem;
	}
}

.footer-menu-column__title {
	color: var(--color-roman-silver);
	font-weight: 700;
	margin-bottom: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.footer-menu-column__link {
	padding: 0.4375rem 0;
	display: block;
	line-height: 1;
	text-decoration: none;
	&:hover {
		color: #fff;
		text-decoration: underline;
	}
}
.footer-menu-column__head-toggle-icon {
	display: block;
	width: 1rem;
	height: 1rem;
	transform: rotate(180deg);
	@media (min-width: $mobile-width) {
		display: none;
	}
}
.footer-menu-column._active .footer-menu-column__head-toggle-icon {
	transform: rotate(0deg);
}

.footer-menu-column__list {
	@media (max-width: $mobile-width) {
		display: none;
	}
}
.footer-menu-column._active .footer-menu-column__list {
	display: block;
}
</style>
