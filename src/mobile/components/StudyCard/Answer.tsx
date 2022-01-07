/** @format */
import { View, StyleSheet, Text } from 'react-native';
import Terminal from '../UI/Code/Terminal/Terminal';
import Javascript from '../UI/Code/Javascript/Javascript';
import Yaml from '../UI/Code/Yaml/Yaml';
import { answerType } from '../../types';
import useCustomTheme from '../../hooks/useCustomTheme';

interface props {
	answer: string;
	answerType: answerType;
	isVisible?: boolean;
}

const Answer: React.FC<props> = (props) => {
	const { answer, answerType, isVisible = true } = props;
	const {themeStyle} = useCustomTheme();

	if(!isVisible) return null

	return (
		<View style={styles.answer_container}>
			{answerType === 'text' && <Text style={themeStyle.text}>{answer}</Text>}
			{answerType === 'terminal' && <Terminal code={answer} />}
			{answerType === 'javascript' && <Javascript code={answer} />}
			{answerType === 'yaml' && <Yaml code={answer} />}
		</View>
	);
};

export default Answer;

const styles = StyleSheet.create({
	answer_container: {
		margin: 10,
		borderRadius: 12,
		overflow: 'hidden',
	},
});
