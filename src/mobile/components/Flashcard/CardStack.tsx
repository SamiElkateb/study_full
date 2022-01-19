import { View, StyleSheet, Text } from 'react-native';
import { useContext } from 'react';
import ProgressBar from '../UI/ProgressBar';
import StudyContext from '../../Context/StudyContext';
import Flashcard from './Flashcard';
import useCustomTheme from '../../hooks/useCustomTheme';

const CardStack: React.FC = (props) => {
	const studyCtx = useContext(StudyContext);
	const { studyDeck, progress } = studyCtx;
	const { themeStyle } = useCustomTheme();
	return (
		<View style={[themeStyle.background, styles.container]}>
			<ProgressBar progress={progress} />
			{studyDeck.map((flashCard, index) => (
				<Flashcard
					key={flashCard.key}
					flashCard={flashCard}
					index={index}
				/>
			))}
		</View>
	);
};

export default CardStack;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
