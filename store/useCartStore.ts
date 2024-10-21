import { ref, computed, watch, onMounted } from 'vue';
import type { TCartItem } from '~/types/TCartItem';
import type { TProductVariation } from '~/types/TProductVariation';
import useMediaFilesStore from './useMediaFilesStore';
import productVariationService from '~/service/productVariationService';
import { useLocalStorage } from '@vueuse/core';

const useCartStore = () => {
    // Dependencies
    const mediaFilesStore = useMediaFilesStore();

    // Reactive state
    // const storedCartItems = useCookie<TCartItem[]>('cartItems', {
    //     sameSite: 'lax',
    //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    // });
    // const syncCartWithCookies = () => {
    //     storedCartItems.value = cartItems.value.map(item => ({
    //         ...item,
    //         product_variation: undefined,
    //     }));
    // };
    // watch(cartItems, syncCartWithCookies, { immediate: true, deep: true });

    // const cartItems = ref<TCartItem[]>(storedCartItems.value || []);
    // const cartItems = ref<TCartItem[]>([]);
    const cartItems = useLocalStorage<TCartItem[]>('cartItems', [], {
        initOnMounted: true,
    });

    // Helper to find cart item by product variation
    const findCartItemById = (id: number) => cartItems.value.find(item => item.product_variation_id === id);

    // Fetch product variations for cart items
    const syncCartWithServer = async () => {
        try {
            const variationIds = cartItems.value.map(item => item.product_variation_id);
            const productVariations = await productVariationService.fetchSelection(variationIds);

            let newCartItems: TCartItem[] = [];
            productVariations.forEach(variation => {
                const cartItem = findCartItemById(variation.id);
                if (cartItem) {
                    cartItem.product_variation = variation;
                    newCartItems.push(cartItem);
                }
            });

            cartItems.value = newCartItems;

            mediaFilesStore.addMediaFilesToLoad(productVariations);
            await mediaFilesStore.loadMediaFiles();
        } catch (error) {
            console.error('Error loading product variations:', error);
            cartItems.value = [];
        }
    };

    // Cart actions
    const addItemToCart = (variation: TProductVariation, quantity: number = 1) => {
        const existingItem = findCartItemById(variation.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem: TCartItem = {
                product_variation_id: variation.id,
                product_variation: variation,
                quantity: quantity,
                inGiftQuantity: 0,
            };
            cartItems.value.push(newItem);
            mediaFilesStore.addMediaFilesToLoad([variation]);
            mediaFilesStore.loadMediaFiles();

            syncCartWithServer();
        }
    };

    const removeSingleItemFromCart = (variation: TProductVariation) => {
        const itemToRemove = findCartItemById(variation.id);
        if (!itemToRemove) return;

        itemToRemove.quantity--;

        if (itemToRemove.quantity <= 0) {
            cartItems.value = cartItems.value.filter(item => item !== itemToRemove);
        }
    };

    const updateCartItemQuantity = (variation: TProductVariation, newQuantity: number) => {
        const cartItem = findCartItemById(variation.id);
        if (!cartItem || !cartItem.product_variation) return;

        const diff = newQuantity - cartItem.quantity;
        const isAdding = diff > 0;

        for (let i = 0; i < Math.abs(diff); i++) {
            isAdding ? addItemToCart(cartItem.product_variation) : removeSingleItemFromCart(cartItem.product_variation);
        }
    };

    const clearCart = () => {
        cartItems.value = [];
    };

    const toggleItemInCart = (variation: TProductVariation) => {
        isInCart(variation.id) ? removeSingleItemFromCart(variation) : addItemToCart(variation);
    };

    // Cart utilities
    const isInCart = (id: number) => cartItems.value.some(item => item.product_variation_id === id);
    const isEntirelyGift = (id: number) => {
        const item = findCartItemById(id);
        return item ? item.quantity === item.inGiftQuantity : false;
    };

    // Computed properties
    const cartItemTotalPrice = (item: TCartItem) => {
        return item.product_variation ? item.product_variation.price * (item.quantity - item.inGiftQuantity) : 0;
    };

    const totalCartQuantity = computed(() =>
        cartItems.value.reduce((count, item) => count + item.quantity - item.inGiftQuantity, 0)
    );

    const totalGiftItems = computed(() =>
        cartItems.value.reduce((count, item) => count + item.inGiftQuantity, 0)
    );

    const totalCartPrice = computed(() =>
        cartItems.value.reduce((total, item) => total + cartItemTotalPrice(item), 0)
    );

    return {
        cartItems,
        addItemToCart,
        removeSingleItemFromCart,
        updateCartItemQuantity,
        syncCartWithServer,
        clearCart,
        toggleItemInCart,
        cartItemTotalPrice,
        isInCart,
        isEntirelyGift,
        totalCartQuantity,
        totalGiftItems,
        totalCartPrice,
    };
};

export default useCartStore;
