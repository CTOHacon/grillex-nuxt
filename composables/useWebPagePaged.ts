export const usePaged = () => {
	const {
		fullPath
	} = useRoute();
	const paged = computed(() => {
		return getPagedFromWebPagePath(fullPath) || 1;
	});
	return paged;
}
