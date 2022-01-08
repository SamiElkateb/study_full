/** @format */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import Icon from '../components/UI/Icon';
import useCustomTheme from '../hooks/useCustomTheme';
import CardStack from '../screens/CardStack';
import ChapterScreen from '../screens/ChapterScreen';
import LessonScreen from '../screens/LessonScreen';
import BottomTabNavigator from './BottomTab';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { theme } = useCustomTheme();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="Chapters" component={ChapterScreen} />
			<Stack.Screen name="Lessons" component={LessonScreen} />
			<Stack.Screen
				name="Study"
				component={CardStack}
				options={({ navigation }) => ({
					title: 'Study',
					headerTintColor: 'transparent',
					gestureEnabled: false,
					headerRight: () => (
						<Pressable
							onPress={() => navigation.navigate('Modal')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<Icon
								name="flag"
								size={'small'}
								color={theme.tabIconDefault}
							/>
						</Pressable>
					),
					headerLeft: () => (
						<Pressable
							onPress={() => navigation.goBack()}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<Icon
								name="close"
								size={'small'}
								color={theme.tabIconDefault}
							/>
						</Pressable>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

export default StackNavigator;
