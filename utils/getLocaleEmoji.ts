export const getLocaleEmoji = (locale: string) => {
    switch (locale) {
        case 'uk':
            return '🇺🇦';
        case 'ru':
            return '🇷🇺';
        case 'en':
            return '🇺🇸';
        default:
            return locale;
    }
}