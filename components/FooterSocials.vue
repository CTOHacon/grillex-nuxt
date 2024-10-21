<template>
	<div class="footer-socials">
		<a
			class="footer-socials__link"
			:href="linkedin"
			target="_blank"
			rel="noopener noreferrer"
			title="Linkedin"
		>
			<SvgIcon name="linkedin" />
		</a>
		<a
			class="footer-socials__link"
			:href="whatsapp"
			target="_blank"
			rel="noopener noreferrer"
			title="Whatsapp"
		>
			<SvgIcon name="whatsapp" />
		</a>
		<a
			class="footer-socials__link"
			:href="facebook"
			target="_blank"
			rel="noopener noreferrer"
			title="Facebook"
		>
			<SvgIcon name="facebook" />
		</a>
		<a
			class="footer-socials__link"
			:href="instagram"
			target="_blank"
			rel="noopener noreferrer"
			title="Instagram"
		>
			<SvgIcon name="instagram" />
		</a>
	</div>
</template>

<script setup lang="ts">
import useGlobalSettingsStore from '~/store/useGlobalSettingsStore';

const { getData } = useGlobalSettingsStore();
const linkedin = getData('contacts.socials.linkedin');
const whatsapp = getData('contacts.socials.whatsapp');
const facebook = getData('contacts.socials.facebook');
const instagram = getData('contacts.socials.instagram');
</script>

<style scoped lang="scss">
.footer-socials {
	display: flex;
	gap: 1.5rem;
	color: #d8e3ee;
}
.footer-socials__link {
	display: block;
	transition: color 0.2s ease, transform 0.2s ease;
	svg {
		width: 1.75rem;
		height: 1.75rem;
	}
	&:hover {
		color: #fff;
		transform: scale(1.1);
	}
}
</style>
