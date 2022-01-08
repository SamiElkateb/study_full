import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from '../components/UI/Icon';
import useCustomTheme from '../hooks/useCustomTheme';
import DailyCards from '../screens/DailyCards';
import CourseScreen from '../screens/CourseScreen';
import Stats from '../screens/Stats';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
	const { theme } = useCustomTheme();

	return (
		<Tab.Navigator
			initialRouteName="BottomTab"
			screenOptions={{
				tabBarActiveTintColor: theme.primary,
			}}
		>
			<Tab.Screen
				name="Learn"
				component={CourseScreen}
				options={({ navigation }) => ({
					title: 'Learn',
					tabBarIcon: ({ color }) => (
						<Icon name="curved-flag" color={color} size={'small'} />
					),
				})}
			/>
			<Tab.Screen
				name="Daily"
				component={DailyCards}
				options={({ route }) => ({
					title: 'Daily Cards',
					tabBarIcon: ({ color }) => (
						<Icon name="calendar" color={color} size={'small'} />
					),
				})}
			/>
			<Tab.Screen
				name="Stats"
				component={Stats}
				options={{
					title: 'Stats',
					tabBarIcon: ({ color }) => (
						<Icon name="trophy" color={color} size={'small'} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;
