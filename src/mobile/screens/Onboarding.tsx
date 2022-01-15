import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/UserEvents/Button';

const Onboarding: React.FC = () => {
	const navigation = useNavigation();

	const navigateToLoginHandler = () => {
		navigation.navigate('Login');
	};
	const navigateToRegisterHandler = () => {
		navigation.navigate('Register');
	};
	return (
		<SafeAreaView style={[styles.safe_container]}>
			<Text style={[styles.title]}>TheStudyApp</Text>
			<Image
				style={[styles.image]}
				source={require('../assets/images/robot.png')}
			/>
			<Text style={[styles.subtitle]}>A simple flashcard app</Text>
			<Text style={[styles.description]}>
				Study your flashcards daily and optimize your learning by
				repeating concepts at the perfect time interval for maximum
				memory retention.
			</Text>
			<View style={[styles.button_container]}>
				<Button
					style={[styles.button]}
					styling="secondary"
					onClick={navigateToLoginHandler}
				>
					Login
				</Button>
				<Button
					style={[styles.button]}
					onClick={navigateToRegisterHandler}
				>
					Signup
				</Button>
			</View>
		</SafeAreaView>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		fontSize: 28,
		textAlign: 'center',
		marginTop: 16,
	},
	image: {
		width: 200,
		height: 200,
		alignSelf: 'center',
	},
	subtitle: {
		fontWeight: 'bold',
		fontSize: 28,
		textAlign: 'justify',
	},
	description: {
		fontWeight: '400',
		fontSize: 20,
		textAlign: 'justify',
	},
	safe_container: {
		flex: 1,
		padding: 16,
		justifyContent: 'space-between',
	},
	button_container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	button: {},
});
