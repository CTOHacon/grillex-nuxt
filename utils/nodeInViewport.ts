export const findClosestToViewportCenterNode = (
    nodes: HTMLElement[]
): HTMLElement => {
    const centerOfWindow = window.scrollY + window.innerHeight / 2;
    let smallestDistance = Number.MAX_VALUE;
    let closestNode = nodes[0];

    for (const node of nodes) {
        const tabRect = node.getBoundingClientRect();
        const tabCenter = tabRect.top + window.scrollY + tabRect.height / 2;
        const distance = Math.abs(tabCenter - centerOfWindow);

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestNode = node;
        }
    }

    return closestNode;
};
