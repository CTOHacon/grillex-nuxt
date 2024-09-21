const htmlTagsDestroyer = (html: string): string => {
	return html.replace(/<[^>]*>/g, '');
};

export default htmlTagsDestroyer;
