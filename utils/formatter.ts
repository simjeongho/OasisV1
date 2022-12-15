export const dateFormatter = (date: string | undefined, replacement?: string) =>
	date ? (replacement ? date.slice(0, 10).replace(/-/gi, replacement) : date.slice(0, 10)) : '';

export const uriLinkFormatter = (text: string | undefined) => {
	if (!text) return '';

	const uriRegExp =
		/(?:https?:\/\/|www\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gim;

	return text.replace(uriRegExp, '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>');
};

export const imageTypeFormatter = (path: string) => path.slice(0, 5);
