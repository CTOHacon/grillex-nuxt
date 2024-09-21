import en from '~/locales/en.json';
import uk from '~/locales/uk.json';
import ru from '~/locales/ru.json';

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'uk',
    availableLocales: ['en', 'uk', 'ru'],
    detectBrowserLanguage: false,
    messages: {
        en,
        uk,
        ru
    }
}))