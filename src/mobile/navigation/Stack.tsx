import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import Icon from '../components/UI/Icon';
import useCustomTheme from '../hooks/useCustomTheme';
import StudyScreen from '../screens/StudyScreen';
import ChapterScreen from '../screens/ChapterScreen';
import LessonScreen from '../screens/LessonScreen';
import BottomTabNavigator from './BottomTab';
import useAuth from '../hooks/useAuth';
import Onboarding from '../screens/Onboarding';
import { Login, Register } from '../screens/Auth';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { theme } = useCustomTheme();
	const { isLoggedIn } = useAuth();
	return (
		<Stack.Navigator>
			{!isLoggedIn && (
				<>
					<Stack.Screen
						name="Root"
						component={Onboarding}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Login"
						component={Login}
						options={({ navigation }) => ({
							title: 'Login',
							headerTransparent: true,
							headerTintColor: 'transparent',
							headerLeft: () => (
								<Pressable
									onPress={() => navigation.goBack()}
									style={({ pressed }) => ({
										opacity: pressed ? 0.5 : 1,
									})}
								>
									<Icon
										name="back"
										size={'large'}
										color={theme.tabIconDefault}
									/>
								</Pressable>
							),
						})}
					/>
					<Stack.Screen
						name="Register"
						component={Register}
						options={({ navigation }) => ({
							title: 'Login',
							headerTransparent: true,
							headerTintColor: 'transparent',
							headerLeft: () => (
								<Pressable
									onPress={() => navigation.goBack()}
									style={({ pressed }) => ({
										opacity: pressed ? 0.5 : 1,
									})}
								>
									<Icon
										name="back"
										size={'large'}
										color={theme.tabIconDefault}
									/>
								</Pressable>
							),
						})}
					/>
				</>
			)}
			{isLoggedIn && (
				<>
					<Stack.Screen
						name="Root"
						component={BottomTabNavigator}
						options={{ headerShown: false }}
					/>
					<Stack.Screen name="Chapters" component={ChapterScreen} />
					<Stack.Screen name="Lessons" component={LessonScreen} />
					<Stack.Screen
						name="Study"
						component={StudyScreen}
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
				</>
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
