/** @format */

import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../components/UserEvents/Button';
import useCustomTheme from '../hooks/useCustomTheme';
import StudyContext from '../store/StudyContext';

const DailyCards: React.FC= () => {
	const studyCtx = useContext(StudyContext);
	const { studyDeck } = studyCtx;
	const navigation = useNavigation();
	const cardsRemaining = studyDeck.length;
	const areCardsRemaining = studyDeck.length > 0;
	const {themeStyle} = useCustomTheme()

	const onStartHandler = () => {
		navigation.navigate('Study');
	};

	return (
		<View style={styles.container}>
			<View style={styles.number_card_container}>
				<Text style={[themeStyle.text, styles.number]}>{cardsRemaining}</Text>
				<Text style={[themeStyle.text, styles.text ]}>Cards remaining</Text>
			</View>
			{areCardsRemaining && <Button onClick={onStartHandler}>Start</Button>}
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
