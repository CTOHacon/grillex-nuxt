import { onMounted, onUnmounted, ref } from 'vue';

let headerRef: Ref<HTMLElement | null> | null = null;
const getHeaderHeight = () => headerRef?.value?.offsetHeight || 0;
export const headerHeight = ref(getHeaderHeight());

const observer = ref<ResizeObserver>();
const setupObserver = () => {
	observer.value = new ResizeObserver(() => {
		headerHeight.value = getHeaderHeight();
		document.body.style.setProperty(
			'--header-height',
			`${headerHeight.value}px`
		);
	});
}

const setupHeader = (headerRefSetup: Ref<HTMLElement | null>) => {
	headerRef = headerRefSetup;

	onMounted(() => {
		setupObserver();

		observer.value?.observe(headerRef?.value as HTMLElement);

		document.body.style.setProperty(
			'--header-height',
			`${getHeaderHeight()}px`
		);
		document.body.style.setProperty(
			'--max-header-height',
			`${getHeaderHeight()}px`
		);
	});

	onUnmounted(() => {
		if (headerRef && headerRef.value) observer.value?.unobserve(headerRef.value);
	});
};

// observe headerRef height change and update headerHeight
export default function useHeader() {
	return { headerHeight, getHeaderHeight, setupHeader };
}
