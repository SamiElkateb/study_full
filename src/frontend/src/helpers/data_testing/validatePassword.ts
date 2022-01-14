export const validatePassword = (string: string) => {
	return Boolean(string.length > 7);
};
