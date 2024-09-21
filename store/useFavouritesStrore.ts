import { ref, computed, watch, onMounted } from 'vue';
import type { TFavouritesItem } from '~/types/TFavouritesItem';
import type { TLoadsProductVariations, TProductVariation } from '~/types/TProductVariation';
import useMediaFilesStore from './useMediaFilesStore';
import productService from '~/service/productService';
import type { TProduct } from '~/types/TProduct';

const useFavouritesStore = defineStore('favouritesStore', () => {
    // Dependencies
    const mediaFilesStore = useMediaFilesStore();

    // Reactive state
    const cookieFavouritesItems = useCookie<TFavouritesItem[]>('favouriteItems', {
        sameSite: 'lax',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
    const favouriteItems = ref<TFavouritesItem[]>(cookieFavouritesItems.value || []);

    // Helper to find favourite item by product
    const findFavouritesItemById = (id: number) => favouriteItems.value.find(item => item.product_id === id);

    // Fetch products for favourite items
    const fetchProductsForFavourites = async () => {
        try {
            const productIds = favouriteItems.value.map(item => item.product_id);
            const products = await productService.fetchSelection(productIds);

            products.forEach(product => {
                const favouriteItem = findFavouritesItemById(product.id);
                if (favouriteItem) favouriteItem.product = product;
            });

            mediaFilesStore.addMediaFilesToLoad(products);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error loading products:', error);
            favouriteItems.value = [];
        }
    };

    // Sync favourite items with cookies
    const syncFavouritesWithCookies = () => {
        cookieFavouritesItems.value = favouriteItems.value.map(item => ({
            ...item,
            product: undefined,
        }));
    };

    // Fetch products on component mount
    onMounted(fetchProductsForFavourites);

    // Watch favouriteItems and sync with cookies
    watch(favouriteItems, syncFavouritesWithCookies, { immediate: true, deep: true });

    const addItemToFavourites = (product: TProduct & TLoadsProductVariations) => {
        favouriteItems.value.push({ product_id: product.id, product });
    }

    const removeItemFromFavourites = (product: TProduct & TLoadsProductVariations) => {
        favouriteItems.value = favouriteItems.value.filter(item => item.product_id !== product.id);
    };

    const clearFavourites = () => {
        favouriteItems.value = [];
    };

    const toggleItemInFavourites = (product: TProduct & TLoadsProductVariations) => {
        isInFavourites(product.id) ? removeItemFromFavourites(product) : addItemToFavourites(product);
    };

    const isInFavourites = (id: number) => favouriteItems.value.some(item => item.product_id === id);

    const favouritesQuantity = computed(() =>
        favouriteItems.value.reduce((acc, item) => acc + (item.product ? 1 : 0), 0)
    );

    return {
        favouriteItems,
        addItemToFavourites,
        removeItemFromFavourites,
        clearFavourites,
        toggleItemInFavourites,
        isInFavourites,
        favouritesQuantity
    };
});

export default useFavouritesStore;
