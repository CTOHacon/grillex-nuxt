<template>
	<nav class="footer-menu">
		<FooterMenuColumn
			v-for="(column, index) in footerMenu"
			:key="index"
			:column="column"
			class="footer-menu__column"
		/>
	</nav>
</template>

<script setup lang="ts">
import useGlobalSettingsStore from '~/store/useGlobalSettingsStore';
import FooterMenuColumn from './FooterMenuColumn.vue';

const { getData } = useGlobalSettingsStore();
const footerMenu = getData('footer_menu.columns');
</script>

<style scoped lang="scss">
@import '~/styles/variables.scss';
.footer-menu {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 2.5rem;
	@media (max-width: $mobile-width) {
		flex-direction: column;
		gap: 1rem;
	}
}
.footer-menu__column {
	flex: max-content 0 0;
}
</style>
