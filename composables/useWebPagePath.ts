/**
 * Returns the sanitized web page path based on the current route.
 * @returns The web page path.
 */
export const useWebPagePath = () => {
    const route = useRoute();

    const webPagePath = computed(() => {
        let webPagePath = route.fullPath.replace(/^\/[a-z]{2}(\/|$)/, '/');

        webPagePath = getPathWithoutPaged(webPagePath);

        if (webPagePath.startsWith('/')) webPagePath = webPagePath.substring(1);
        if (webPagePath.endsWith('/')) webPagePath = webPagePath.substring(0, webPagePath.length - 1);

        if (Array.isArray(webPagePath)) {
            webPagePath = webPagePath.join('/');
        }

        if (!webPagePath) webPagePath = 'home';

        return webPagePath;
    });

    return webPagePath;
}
