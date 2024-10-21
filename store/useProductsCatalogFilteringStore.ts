import { defineStore } from 'pinia'
import type { TSelectOptions } from '~/types/TSelectOptions';
import useFilteredProductCategoryStore from './useFilteredProductCategoryStore';

const useProductsCatalogFilteringStore = defineStore('productsCatalogIndexFilteringStore', () => {
    const {
        t
    } = useI18n();

    const sorting = ref<'popular' | 'price_asc' | 'price_desc'>('popular');
    const sortingOptions = ref<TSelectOptions>([
        { value: 'popular', label: t('the_most_popular') },
        { value: 'price_asc', label: t('from_cheap_to_expensive') },
        { value: 'price_desc', label: t('from_expensive_to_cheap') }
    ]);
    const setSorting = (value: 'popular' | 'price_asc' | 'price_desc') => {
        sorting.value = value;
    }

    const perPage = ref(20);
    const perPageCountOptions = ref<TSelectOptions>([
        { value: 20, label: '20' },
        { value: 40, label: '40' },
        { value: 60, label: '60' }
    ]);
    const setPerPage = (value: number) => {
        perPage.value = value;
    }

    const minPrice = ref<number | null>(0);
    const maxPrice = ref<number | null>(0);
    const priceStart = ref(0);
    const priceEnd = ref(0);
    const userHasCustomizedPriceRange = computed(() => {
        return minPrice.value !== priceStart.value || maxPrice.value !== priceEnd.value;
    });

    // TODO: Fix the logic of filters
    const setupPriceRangeLimits = (min: number, max: number) => {
        if (!userHasCustomizedPriceRange.value) {
            priceStart.value = min;
            priceEnd.value = max;
        } else {
            if (priceStart.value < min || priceStart.value === 0) priceStart.value = min;
            if (priceEnd.value > max || priceEnd.value === 0) priceEnd.value = max;
        }
        minPrice.value = min;
        maxPrice.value = max;
    }

    const appliedProductFilterOptions = ref<Set<number>>(new Set());

    const filteredProductCategoryStore = useFilteredProductCategoryStore();

    watchEffect(() => {
        if (!filteredProductCategoryStore.data) return;
        filteredProductCategoryStore.data.product_filter_options.forEach((option) => {
            appliedProductFilterOptions.value.add(option.id);
        });
    });

    const isProductFilterOptionApplied = (filterOptionId: number) => {
        return appliedProductFilterOptions.value.has(filterOptionId);
    }

    const enableProductFilterOption = (filterOptionId: number) => {
        appliedProductFilterOptions.value.add(filterOptionId);
    }

    const toggleProductFilterOption = (filterOptionId: number) => {
        if (filteredProductCategoryStore.isProductFilterOptionAlwaysEnabled(filterOptionId)) return;

        if (appliedProductFilterOptions.value.has(filterOptionId)) {
            appliedProductFilterOptions.value.delete(filterOptionId);
        } else {
            appliedProductFilterOptions.value.add(filterOptionId);
        }
    }

    const resetFilters = () => {
        priceStart.value = minPrice.value || 0;
        priceEnd.value = maxPrice.value || 0;
        appliedProductFilterOptions.value.clear();
    }

    return {
        sorting,
        setSorting,
        sortingOptions,
        perPage,
        setPerPage,
        perPageCountOptions,
        priceStart,
        priceEnd,
        setupPriceRangeLimits,
        appliedProductFilterOptions,
        enableProductFilterOption,
        toggleProductFilterOption,
        isProductFilterOptionApplied,
        resetFilters
    };
});

export default useProductsCatalogFilteringStore;
