import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../components/UserEvents/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import { flashcardData } from '../types/api_interfaces';
import cards from '../database/cards.json';
const allFlashcards = cards as unknown as flashcardData[];

const DailyCards: React.FC = () => {
	const navigation = useNavigation();
	const flashcardsRemaining = allFlashcards.length;
	const areCardsRemaining = allFlashcards.length > 0;
	const { themeStyle } = useCustomTheme();

	const startHandler = () => {
		navigation.navigate('Study', { initialDeck: allFlashcards });
	};

	return (
		<View style={styles.container}>
			<View style={styles.number_card_container}>
				<Text style={[themeStyle.text, styles.number]}>
					{flashcardsRemaining}
				</Text>
				<Text style={[themeStyle.text, styles.text]}>
					Cards remaining
				</Text>
			</View>
			{areCardsRemaining && <Button onClick={startHandler}>Start</Button>}
		</View>
	);
};

export default DailyCards;

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
