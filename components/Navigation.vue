<template>
	<nav>
		<NuxtLink :to="localePath('/')">Home</NuxtLink>
		<NuxtLink :to="localePath('/simple-page')">Simple Page</NuxtLink>
		<NuxtLink :to="localePath('/another-page')">Another Page</NuxtLink>
		<NuxtLink :to="localePath('/blog')">Blog Archive</NuxtLink>

		<!-- availableLocales links -->
		<div>
			{{ $t('change_locale') }}:
			<ul>
				<li v-for="locale in availableLocales" :key="locale">
					<NuxtLink :to="switchLocalePath(locale)">
						{{ locale }}
					</NuxtLink>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

const { availableLocales } = useI18n();
</script>

<style scoped></style>
