/** @format */
import { View, StyleSheet, Text, Pressable } from 'react-native';
import Terminal from '../UI/Code/Terminal/Terminal';
import Javascript from '../UI/Code/Javascript/Javascript';
import Yaml from '../UI/Code/Yaml/Yaml';
import { answerType } from '../../types/types';
import useCustomTheme from '../../hooks/useCustomTheme';
import { useState } from 'react';

interface props {
	answer: string;
	answerType: answerType;
}

const Answer: React.FC<props> = (props) => {
	const { answer, answerType } = props;
	const { themeStyle } = useCustomTheme();
	const [isVisible, setIsVisible] = useState(false);

	const showAnswerHandler = () => {
		setIsVisible(true);
	};
	const hideAnswerHandler = () => {
		setIsVisible(false);
	};
	if (!isVisible) {
		return (
			<Pressable onPress={showAnswerHandler} hitSlop={150}>
				<View
					style={[
						styles.hidden_answer_container,
						themeStyle.background,
					]}
				>
					<Text
						style={[
							styles.hidden_answer_text,
							themeStyle.onBackground,
						]}
					>
						Show answer
					</Text>
				</View>
			</Pressable>
		);
	}

	return (
		<Pressable onPress={hideAnswerHandler} hitSlop={0}>
			<View style={styles.answer_container}>
				{answerType === 'text' && (
					<Text style={themeStyle.text}>{answer}</Text>
				)}
				{answerType === 'terminal' && <Terminal code={answer} />}
				{answerType === 'javascript' && <Javascript code={answer} />}
				{answerType === 'yaml' && <Yaml code={answer} />}
			</View>
		</Pressable>
	);
};

export default Answer;

const styles = StyleSheet.create({
	hidden_answer_container: {
		backgroundColor: 'grey',
		paddingVertical: 40,
		marginHorizontal: 20,
		borderRadius: 12,
	},
	hidden_answer_text: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
		textTransform: 'uppercase',
	},
	answer_container: {
		margin: 10,
		borderRadius: 12,
		overflow: 'hidden',
		overlayColor: 'red',
	},
});
