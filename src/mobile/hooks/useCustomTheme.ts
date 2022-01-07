/** @format */

import { Theme, useTheme } from '@react-navigation/native';

interface CustomTheme extends Theme {
	colors: {
		primary: string;
		background: string;
		card: string;
		text: string;
		border: string;
		notification: string;
		correct: string;
		error: string;
		default: string;
		tabIconDefault:string
	},
	styles: {
	  text: {color: string},
	  background: {backgroundColor: string},
	  card: {backgroundColor: string}
	};
}

const useCustomTheme = () => {
	const {styles:themeStyle, colors:theme}= useTheme() as CustomTheme;
	return {themeStyle, theme}
};

export default useCustomTheme;
