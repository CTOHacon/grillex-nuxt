import useWebPageStore from '~/store/useWebPageStore';
import setup404Response from '~/utils/setup404Response';

/**
 * A record of web page components.
 * The keys represent the names of the web pages,
 * and the values are promises that resolve to the corresponding components.
 */
const webPageComponents: Record<string, Promise<any>> = {
    'home': import('~/webPageComponents/HomePage.vue'),

    // !! LEGACY
    'category-page': import('~/webPageComponents/ProductCategoryPage.vue'),
    // !! END LEGACY

    'product-category-page': import('~/webPageComponents/ProductCategoryPage.vue'),
    'filtered-category-page': import('~/webPageComponents/ProductCategoryPage.vue'),
    'product-page': import('~/webPageComponents/ProductVariationPage.vue'),
    'post-page': import('~/webPageComponents/PostPage.vue'),
    'post-category-page': import('~/webPageComponents/PostCategoryPage.vue'),
    '404': import('~/webPageComponents/NotFound.vue'),
    invalidWebPageType: import('~/webPageComponents/InvalidWebPageType.vue')
};


/**
 * Retrieves a web page component based on the provided type.
 * If no type is provided, a fallback component template is returned.
 *
 * @param type - The type of the web page component.
 * @returns The web page component as a `defineAsyncComponent` function.
 */
const getWebPageComponent = (
    type: string | undefined = undefined
): ReturnType<typeof defineAsyncComponent> => {
    return defineAsyncComponent(() => {
        if (!type) {
            setup404Response('No type provided');
            return webPageComponents['404'];
        }
        if (!webPageComponents[type]) {
            setup404Response(`Invalid web page type: ${type}`);
            return webPageComponents.invalidWebPageType;
        }
        return webPageComponents[type];
    });
};

/**
 * Custom composable function that provides a web page component based on the given type.
 *
 * @returns An object containing the `webPageComponent` ref.
 */
const useWebPageComponent = () => {
    const webPageComponent = shallowRef<ReturnType<typeof defineAsyncComponent>>();
    const webPageStore = useWebPageStore();

    watchEffect(() => {
        console.info(`🔄 Update web page component due to web page update. Web Page Type: ${webPageStore.data?.type}`);

        webPageComponent.value = getWebPageComponent(webPageStore.data?.type);
    })

    return {
        webPageComponent,
    };
}

export default useWebPageComponent;