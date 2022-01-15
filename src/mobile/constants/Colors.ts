/** @format */

import { DarkTheme, DefaultTheme } from '@react-navigation/native';
const onLight = 'rgb(5, 25, 45)';
const onDark = 'rgb(255, 255, 255)';
const ColorsBase = {
	primary: 'rgb(0, 200, 83)',
	onPrimary: onLight,
	accent: 'rgb(246, 206, 70)',
	onAccent: onLight,
	correct: 'rgb(101, 196, 102)',
	onCorrect: onDark,
	error: 'rgb(234, 78, 61)',
	errorBackground: '#ffebee',
	onError: onDark,
};
const ColorsTheme = {
	light: {
		text: 'rgb(62, 65, 106)',
		background: 'rgb(240, 244, 253)',
		onBackground: onLight,
		surface: 'rgb(255, 255, 255)',
		onSurface: onLight,
	},
	dark: {
		text: 'rgb(220, 220, 220)',
		background: 'rgb(40, 40, 40)',
		onBackground: onDark,
		surface: 'rgb(62, 65, 106)',
		onSurface: onDark,
	},
};

const lightTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		...ColorsBase,
		...ColorsTheme.light,
		border: 'rgb(199, 199, 204)',
		notification: 'rgb(255, 69, 58)',
		default: ColorsTheme.light.text,
		card: ColorsTheme.light.surface,
		tint: ColorsBase.primary,
		tabIconDefault: '#ccc',
		tabIconSelected: ColorsBase.primary,
	},
	styles: {
		text: { color: ColorsTheme.light.text },
		onSurface: { color: ColorsTheme.light.onSurface },
		onBackground: { color: ColorsTheme.light.onBackground },
		background: { backgroundColor: ColorsTheme.light.background },
		surface: { backgroundColor: ColorsTheme.light.surface },
	},
};

const darkTheme = {
	...DarkTheme,
	dark: true,
	colors: {
		...ColorsBase,
		...ColorsTheme.dark,
		card: ColorsTheme.dark.surface,
		border: 'black',
		notification: 'rgb(255, 69, 58)',
		default: ColorsTheme.dark.text,
		tint: ColorsBase.primary,
		tabIconDefault: '#ccc',
		tabIconSelected: ColorsBase.primary,
	},
	styles: {
		text: { color: ColorsTheme.dark.text },
		onSurface: { color: ColorsTheme.dark.onSurface },
		onBackground: { color: ColorsTheme.dark.onBackground },
		background: { backgroundColor: ColorsTheme.dark.background },
		surface: { backgroundColor: ColorsTheme.dark.surface },
	},
};

export { darkTheme, lightTheme, ColorsBase };
