import { View, StyleSheet, Text } from 'react-native';
import { useContext } from 'react';
import ProgressBar from '../UI/ProgressBar';
import StudyContext from '../../store/StudyContext';
import StudyCard from './StudyCard';
import useCustomTheme from '../../hooks/useCustomTheme';

const CardStack: React.FC = (props) => {
	const studyCtx = useContext(StudyContext);
	const { studyDeck, progress } = studyCtx;
	const { themeStyle } = useCustomTheme();

	return (
		<View style={[themeStyle.background, styles.container]}>
			<ProgressBar progress={progress} />
			{studyDeck.map((studyCard, index) => (
				<StudyCard
					key={studyCard.id}
					studyCard={studyCard}
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
