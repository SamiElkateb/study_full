import { View, StyleSheet, Text } from 'react-native';
import StudyCard from '../components/Flashcard/StudyCard';
import { useContext } from 'react';
import StudyContext, { StudyContextProvider } from '../Context/StudyContext';
import ProgressBar from '../components/UI/ProgressBar';
import useCustomTheme from '../hooks/useCustomTheme';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import CardStack from '../components/Flashcard/CardStack';

interface props {
	route: RouteProp<RootStackParamList, 'Study'>;
	navigation: NavigationProp<RootStackParamList, 'Study'>;
}

const StudyScreen: React.FC<props> = (props) => {
	const { route } = props;
	const { initialDeck } = route.params;

	return (
		<StudyContextProvider initialDeck={initialDeck}>
			<CardStack />
		</StudyContextProvider>
	);
};

export default StudyScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
