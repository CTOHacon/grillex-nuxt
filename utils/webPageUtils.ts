export const getPathWithoutPaged = (path: string | string[]) => {
    if (Array.isArray(path)) path = path.join('/');
    return path.replace(/\/page\/\d+$/, '');
}

export const getPagedFromWebPagePath = (webPagePath: string | string[]) => {
    if (typeof webPagePath === 'string') {
        webPagePath = webPagePath.split('/');
    }
    if (
        Array.isArray(webPagePath) &&
        webPagePath[webPagePath.length - 2] === 'page'
    ) {
        return Number(webPagePath[webPagePath.length - 1]);
    }
    return null;
}

export const getPagedPath = (path: string, paged: number) => {
    if (paged > 1) {
        path = `${getPathWithoutPaged(path)}/page/${paged}`;
    } else {
        path = getPathWithoutPaged(path);
    }

    if (path[0] !== '/') path = `/${path}`;

    return path;
}