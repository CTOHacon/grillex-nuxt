import type { TPaginated } from "~/types/TPaginated";

const isValidPaginationPage = (data: TPaginated<any> | undefined): boolean => {
    const {
        fullPath
    } = useRoute();

    const paged = getPagedFromWebPagePath(fullPath);
    if (paged === null || (paged > 1 && data && paged <= data.last_page)) { return true; }
    return false;
};

export default isValidPaginationPage;