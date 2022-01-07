/** @format */

import { StyleSheet, Text } from 'react-native';
import { yamlCodeType } from '../../../../types/types';

interface props {
	codeItem: string | { text: string; type: yamlCodeType };
}

const YamlCodeItem: React.FC<props> = (props) => {
	const { codeItem } = props;

	if (typeof codeItem === 'string') {
		return (
			<Text style={{ ...styles.default_text, ...styles.text }}>
				{codeItem.toString()}
			</Text>
		);
	}

	return (
		<Text style={{ ...styles[codeItem.type], ...styles.text }}>
			{codeItem.text.toString()}
		</Text>
	);
};

export default YamlCodeItem;

const styles = StyleSheet.create({
	text: {
		marginBottom: 4,
		fontSize: 12,
		fontFamily: 'Menlo',
	},
	default_text: {
		color: 'white',
	},
	string: {
		color: '#ce9178',
	},
	object: {
		color: '#9cdcfe',
	},
	variable: {
		backgroundColor:"#2b4e6b",
		paddingHorizontal: 4,
		paddingVertical: 2,
		borderRadius: 8,
		overflow: 'hidden',
		color: '#000000',
		fontWeight:'bold'
	},
	comment: {
		color: '#6a9955',
	},
	linebreak: {
		width: '100%',
		height: 0,
		padding: 0,
	},
	tab: {
		width: 12,
	},
});
