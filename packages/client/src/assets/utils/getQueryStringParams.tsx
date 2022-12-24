export const getQueryStringParams = (query: string) => {
	return query
		? (/^[?#]/.test(query) ? query.slice(1) : query)
			.split('&')
			.reduce((params: Record<string, string>, param: string) => {
				const [key, value]: string[] = param.split('=');
				if (key !== undefined) {
					params[key as keyof typeof params] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
				}
				return params;
			}, {}
			)
		: {};
};