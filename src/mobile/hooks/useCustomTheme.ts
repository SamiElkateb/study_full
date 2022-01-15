/** @format */

import { Theme, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../types/theme';

const useCustomTheme = () => {
	const { styles: themeStyle, colors: theme } = useTheme() as CustomTheme;
	return { themeStyle, theme };
};

export default useCustomTheme;
