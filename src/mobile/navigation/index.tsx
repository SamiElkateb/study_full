/** @format */

import {
	NavigationContainer,
} from '@react-navigation/native';
import { lightTheme, darkTheme } from '../constants/Colors';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';
import StackNavigator from './Stack';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? darkTheme : lightTheme}
		>
			<StackNavigator />
		</NavigationContainer>
	);
}
