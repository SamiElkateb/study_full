/** @format */

import { StyleSheet, Text } from 'react-native';
import { javascriptCodeType } from '../../../../types/types';

interface props {
	codeItem: string | { text: string; type: javascriptCodeType };
}

const JsCodeItem: React.FC<props> = (props) => {
	const { codeItem } = props;

	if (typeof codeItem === 'string') {
		return (
			<Text style={{ ...styles.default_text, ...styles.text }}>
				{codeItem.toString()}
			</Text>
		);
	}

	if (codeItem.type === 'linebreak') {
		return <Text style={styles.linebreak}>{codeItem.text.toString()}</Text>;
	}

	return (
		<Text style={{ ...styles[codeItem.type], ...styles.text }}>
			{codeItem.text.toString()}
		</Text>
	);
};

export default JsCodeItem;

const styles = StyleSheet.create({
	text: {
		paddingBottom: 8,
		fontSize: 12,
		fontFamily: 'Menlo',
	},
	default_text: {
		color: 'white',
	},
	declaration: {
		color: '#508fc3',
	},
	statement: {
		color: '#c586c0',
	},
	string: {
		color: '#ce9178',
	},
	variable: {
		color: '#9cdcfe',
	},
	function: {
		color: '#dcdcaa',
	},
	comment: {
		color: '#6a9955',
	},
	linebreak: {
		width: '100%',
		height: 0,
		padding: 0,
	},
});
