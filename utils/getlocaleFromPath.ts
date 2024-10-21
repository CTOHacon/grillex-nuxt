export const setuplocaleFromPath = () => {
    const { locale, availableLocales, defaultLocale } = useI18n();
    const {
        fullPath
    } = useRoute();

    const firstPathSegment = fullPath.split('/'); // Extract the first path segment
    const localeFromUrl = firstPathSegment && firstPathSegment[1]; // Extract the locale from the URL

    // Check if the locale from the URL is one of the available locales
    if (availableLocales.includes(localeFromUrl)) {
        locale.value = localeFromUrl; // Set the locale for vue-i18n
    } else {
        locale.value = defaultLocale;
    }
}