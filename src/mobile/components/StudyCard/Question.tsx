/** @format */
import { View, StyleSheet, Text } from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';

interface props {
	question: string;
}

const Question: React.FC<props> = (props) => {
	const { question } = props;
	const {themeStyle} = useCustomTheme();
	return (
		<View style={styles.question_container}>
			<Text style={[themeStyle.text, styles.question]}>{question}</Text>
		</View>
	);
};

export default Question;

const styles = StyleSheet.create({
	question: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	question_container: {
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
});
