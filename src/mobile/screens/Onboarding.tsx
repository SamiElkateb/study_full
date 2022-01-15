import { View, StyleSheet, Text } from 'react-native';
import Login from './Auth/Login';
import Register from './Auth/Register';

const Onboarding: React.FC = () => {
	return <Register />;
};

export default Onboarding;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 26,
		paddingHorizontal: 32,
		justifyContent: 'space-between',
	},
	number_card_container: {
		flex: 1,
		justifyContent: 'center',
	},
	number: {
		textAlign: 'center',
		fontSize: 60,
		marginBottom: 20,
	},
	text: {
		textAlign: 'center',
		fontSize: 24,
		textTransform: 'uppercase',
		fontWeight: 'bold',
	},
});
