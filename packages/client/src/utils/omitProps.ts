export const omitProps = <T extends object, K extends keyof T>(
	data: T,
	props: Array<K>
): Omit<T, K> => {
	if (!data || !Array.isArray(props) || !props.length) {
		return data;
	}
	return props.reduce((acc, prop) => {
		const { [prop as keyof object]: _prop, ...rest } = acc;
		return rest;
	}, data);
};
