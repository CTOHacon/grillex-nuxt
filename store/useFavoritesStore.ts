import { ref, computed, watch, onMounted } from 'vue';
import type { TFavoritesItem } from '~/types/TFavoritesItem';
import type { TLoadsProductVariations, TProductVariation } from '~/types/TProductVariation';
import useMediaFilesStore from './useMediaFilesStore';
import productService from '~/service/productService';
import type { TProduct } from '~/types/TProduct';
import { useLocalStorage } from '@vueuse/core';

const useFavoritesStore = () => {
    // Dependencies
    const mediaFilesStore = useMediaFilesStore();

    const favoriteItems = useLocalStorage<TFavoritesItem[]>('favorites', [], {
        initOnMounted: true,
    });
    // Reactive state
    // const sourceFavoritesItems = useCookie<TFavoritesItem[]>('favoriteItems', {
    //     sameSite: 'lax',
    //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    // });
    //     // Sync favorite items with sources
    //     const syncFavoritesWithCookies = () => {
    //         sourceFavoritesItems.value = favoriteItems.value.map(item => ({
    //             ...item,
    //             product: undefined,
    //         }));
    //     };
    // watch(favoriteItems, syncFavoritesWithCookies, { immediate: true, deep: true });

    // Helper to find favorite item by product
    const findFavoritesItemById = (id: number) => favoriteItems.value.find(item => item.product_id === id);

    // Fetch products for favorite items
    const fetchProductsForFavorites = async () => {
        try {
            const productIds = favoriteItems.value.map(item => item.product_id);
            const products = await productService.fetchSelection(productIds);

            products.forEach(product => {
                const favoriteItem = findFavoritesItemById(product.id);
                if (favoriteItem) favoriteItem.product = product;
            });

            mediaFilesStore.addMediaFilesToLoad(products);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error loading products:', error);
            favoriteItems.value = [];
        }
    };
    const syncFavoritesWithServer = async () => {
        try {
            const variationIds = favoriteItems.value.map(item => item.product_id);
            const productVariations = await productService.fetchSelection(variationIds);

            let newFavouriteItems: TFavoritesItem[] = [];
            productVariations.forEach(variation => {
                const cartItem = findFavoritesItemById(variation.id);
                if (cartItem) {
                    cartItem.product = variation;
                    newFavouriteItems.push(cartItem);
                }
            });

            favoriteItems.value = newFavouriteItems;

            mediaFilesStore.addMediaFilesToLoad(productVariations);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error loading product variations:', error);
            favoriteItems.value = [];
        }
    };

    // Fetch products on component mount
    // onMounted(fetchProductsForFavorites);

    // Watch favoriteItems and sync with sources

    const addItemToFavorites = (product: TProduct & TLoadsProductVariations) => {
        favoriteItems.value.push({ product_id: product.id, product });
    }

    const removeItemFromFavorites = (product: TProduct & TLoadsProductVariations) => {
        favoriteItems.value = favoriteItems.value.filter(item => item.product_id !== product.id);
    };

    const clearFavorites = () => {
        favoriteItems.value = [];
    };

    const toggleItemInFavorites = (product: TProduct & TLoadsProductVariations) => {
        isInFavorites(product.id) ? removeItemFromFavorites(product) : addItemToFavorites(product);
    };

    const isInFavorites = (id: number) => favoriteItems.value.some(item => item.product_id === id);

    const favoritesQuantity = computed(() =>
        favoriteItems.value.reduce((acc, item) => acc + (item.product ? 1 : 0), 0)
    );

    return {
        favoriteItems,
        addItemToFavorites,
        removeItemFromFavorites,
        clearFavorites,
        toggleItemInFavorites,
        syncFavoritesWithServer,
        isInFavorites,
        favoritesQuantity
    };
};

export default useFavoritesStore;
