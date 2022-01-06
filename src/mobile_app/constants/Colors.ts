/** @format */

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

const Colors = {
	correct: 'rgb(101, 196, 102)',
	error: 'rgb(234, 78, 61)',
	primary: 'rgb(101, 196, 102)',
	accent: 'rgb(246, 206, 70)',
	light: {
		primary: 'rgb(101, 196, 102)',
		text: 'rgb(62, 65, 106)',
		background: 'rgb(240, 244, 253)',
		card: 'rgb(255, 255, 255)',
	},
	dark: {
		primary: 'rgb(101, 196, 102)',
		text: 'rgb(220, 220, 220)',
		background: 'rgb(40, 40, 40)',
		card: 'rgb(62, 65, 106)',
	},
};

const lightTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		primary: Colors.primary,
		background: Colors.light.background,
		card: Colors.light.card,
		text: Colors.light.text,
		border: 'rgb(199, 199, 204)',
		notification: 'rgb(255, 69, 58)',
		correct: Colors.correct,
		error: Colors.error,
		default: Colors.light.text,
		tint: Colors.primary,
		tabIconDefault: '#ccc',
		tabIconSelected: Colors.light.primary,
	},
	styles: {
		text: { color: Colors.light.text },
		background: { backgroundColor: Colors.light.background },
		card: { backgroundColor: Colors.light.card },
	},
};

const darkTheme = {
	...DarkTheme,
	dark: true,
	colors: {
		primary: Colors.primary,
		text: Colors.dark.text,
		background: Colors.dark.background,
		card: Colors.dark.card,
		border: 'black',
		notification: 'rgb(255, 69, 58)',
		correct: Colors.correct,
		error: Colors.error,
		default: Colors.dark.text,
		tint: Colors.primary,
		tabIconDefault: '#ccc',
		tabIconSelected: Colors.primary,
	},
	styles: {
		text: { color: Colors.dark.text },
		background: { backgroundColor: Colors.dark.background },
		card: { backgroundColor: Colors.dark.card },
	},
};

export { darkTheme, lightTheme };
