import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Icon from '../components/UI/Icon';
import useCustomTheme from '../hooks/useCustomTheme';
import DailyCards from '../screens/DailyCards';
import Lessons from '../screens/Lessons';
import Stats from '../screens/Stats';


const Tab = createBottomTabNavigator();

const  BottomTabNavigator = () => {
	const {theme} = useCustomTheme()

	return (
		<Tab.Navigator
			initialRouteName="BottomTab"
			screenOptions={{
				tabBarActiveTintColor: theme.primary,
			}}
		>
			<Tab.Screen
				name="Lesson"
				component={Lessons}
				options={({ navigation }) => ({
					title: 'Lessons',
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
}

export default BottomTabNavigator