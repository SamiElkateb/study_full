import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Answer from './Answer';
import RoundButton from '../UserEvents/RoundButton';
import Card from '../UI/Card';
import SwipeContainer from './SwipeContainer';
import FlashcardClass from '../../DataStructures/Flashcard';
import useLinkSwipeBtn from '../../hooks/useLinkSwipeBtn';
import Question from './Question';

interface props {
	flashCard: FlashcardClass;
	index: number;
}
const Flashcard: React.FC<props> = (props) => {
	const { flashCard, index } = props;
	const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(
		undefined
	);

	const correctButtonHook = useLinkSwipeBtn();
	const falseButtonHook = useLinkSwipeBtn();
	const showAnswerButtonHook = useLinkSwipeBtn();

	const { question, answerType, answer } = flashCard;

	const answerCorrectHandler = () => {
		setIsAnswerCorrect(true);
	};
	const answerFalseHandler = () => {
		setIsAnswerCorrect(false);
	};

	return (
		<SwipeContainer
			flashCard={flashCard}
			falseButtonHook={falseButtonHook}
			correctButtonHook={correctButtonHook}
			showAnswerButtonHook={showAnswerButtonHook}
			isAnswerCorrect={isAnswerCorrect}
			index={index}
		>
			<Card index={index}>
				<Question question={question} />
				<Answer answerType={answerType} answer={answer} />

				<View>
					<View style={styles.buttons_container}>
						<RoundButton
							color="error"
							onClick={answerFalseHandler}
							buttonHook={falseButtonHook}
							icon="close"
						/>
						<RoundButton
							color="correct"
							icon="check"
							onClick={answerCorrectHandler}
							buttonHook={correctButtonHook}
						/>
					</View>
				</View>
			</Card>
		</SwipeContainer>
	);
};

export default Flashcard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	buttons_container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	show_answer_container: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: 20,
	},
});
