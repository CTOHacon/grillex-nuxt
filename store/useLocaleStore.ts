const useLocaleStore = defineStore('localeStore', () => {
    const locale = ref('uk');
    const { setLocale, setLocaleCookie } = useI18n();

    const changeLocale = (newLocale: string) => {
        locale.value = newLocale;
    };

    return {
        locale,
        changeLocale
    };
});

export default useLocaleStore;