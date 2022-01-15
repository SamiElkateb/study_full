/** @format */

import { Theme, useTheme } from '@react-navigation/native';

interface CustomTheme extends Theme {
	colors: {
		primary: string;
		onPrimary: string;
		accent: string;
		onAccent: string;
		correct: string;
		onCorrect: string;
		error: string;
		onError: string;
		text: string;
		background: string;
		onBackground: string;
		surface: string;
		onSurface: string;
		border: string;
		notification: string;
		default: string;
		tint: string;
		tabIconDefault: string;
		tabIconSelected: string;
		card: string;
	};
	styles: {
		text: { color: string };
		onSurface: { color: string };
		onBackground: { color: string };
		background: { backgroundColor: string };
		surface: { backgroundColor: string };
	};
}

const useCustomTheme = () => {
	const { styles: themeStyle, colors: theme } = useTheme() as CustomTheme;
	return { themeStyle, theme };
};

export default useCustomTheme;
