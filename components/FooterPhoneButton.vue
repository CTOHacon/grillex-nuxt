<template>
	<a :href="`tel:${phone}`" class="footer-phone-button">
		<SvgIcon name="smartphone" class="footer-phone-button__icon" />
		<span class="footer-phone-button__main">
			<strong class="footer-phone-button__phone">{{ phone }}</strong>
			<small class="footer-phone-button__text">{{
				$t('request_a_call')
			}}</small>
		</span>
	</a>
</template>

<script setup lang="ts">
import useGlobalSettingsStore from '~/store/useGlobalSettingsStore';

const { getData } = useGlobalSettingsStore();
const phone = getData('contacts.phone');
</script>

<style scoped lang="scss">
.footer-phone-button {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	text-decoration: none;
}
.footer-phone-button__icon {
	width: 2.5rem;
	height: 2.5rem;
}
.footer-phone-button__phone {
	display: block;
	color: #f9f9f9;
	font-size: 1.25rem;
	font-weight: 700;
	line-height: 100%;
	margin-bottom: 4px;
}
.footer-phone-button__text {
	display: block;
	position: relative;
	color: #80868e;
	font-size: 1rem;
	font-weight: 500;
	line-height: 100%;
	width: fit-content;
	transition: color 0.2s ease;
	&::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -4px;
		height: 1px;
		opacity: 0.4;
		background: currentColor;
	}
}
.footer-phone-button:hover .footer-phone-button__text {
	color: #f9f9f9;
}
</style>
