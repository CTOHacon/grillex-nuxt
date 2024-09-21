<template>
	<select name="locale-switch" @change="e => changeLocale(e)">
		<option
			v-for="{ code } in locales"
			:value="code"
			:selected="code === locale"
		>
			{{ code }}
		</option>
	</select>
</template>

<script setup lang="ts">
const { locales, locale, setLocale, defaultLocale } = useI18n();
const localizedPath = useSwitchLocalePath();

const changeLocale = async (event: Event) => {
	const newLocale = (event.target as HTMLSelectElement).value;
	if (newLocale === defaultLocale) {
		await setLocale(newLocale);
	}
	location.href = localizedPath(newLocale);
};
</script>

<style scoped lang="scss">
.locale-switch {
	width: fit-content;
	option {
		font-size: 0.875rem;
		text-transform: uppercase;
	}
}
</style>
