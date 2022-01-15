import { Theme } from '@react-navigation/native';

export interface CustomTheme extends Theme {
	colors: {
		primary: string;
		onPrimary: string;
		accent: string;
		onAccent: string;
		correct: string;
		onCorrect: string;
		error: string;
		errorBackground: string;
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

export type CustomThemeColors = keyof CustomTheme['colors'];
