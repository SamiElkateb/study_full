/** @format */

import { StyleSheet, View, Text } from 'react-native';
import javascriptParser from '../../../../helpers/codeParser/javascriptParser';
import JsCodeItem from './JsCodeItem';

interface props {
	code: string;
}

const Javascript: React.FC<props> = (props) => {
	const { code } = props;
	let parsedCode = javascriptParser(code);
	return (
		<View style={styles.terminal}>
			<View style={styles.title}>
				<Text style={styles.title_text}>script.js</Text>
			</View>
			<View style={styles.command_line}>
				{parsedCode?.map((codeItem, index) => {
					return <JsCodeItem codeItem={codeItem} key={index} />;
				})}
			</View>
		</View>
	);
};

export default Javascript;

const styles = StyleSheet.create({
	terminal: {
		backgroundColor: '#1e1e1e',
		paddingVertical: 16,
	},
	title: {
		marginBottom: 16,
		paddingBottom: 8,
		paddingHorizontal: 16,
		borderBottomColor: 'white',
		borderBottomWidth: 2,
	},
	title_text: {
		color: 'white',
		fontWeight: 'bold',
		fontFamily: 'Menlo',
	},
	command_line: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
