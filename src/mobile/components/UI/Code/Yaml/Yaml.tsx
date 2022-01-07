/** @format */

import { StyleSheet, View, Text } from 'react-native';
import yamlParser from '../../../../helpers/codeParser/yamlParser';
import YamlCodeItem from './YamlCodeItem';

interface props {
	code: string;
}

const Yaml: React.FC<props> = (props) => {
	const { code } = props;
	let parsedCode = yamlParser(code);
	return (
		<View style={styles.terminal}>
			<View style={styles.title}>
				<Text style={styles.title_text}>conf.yml</Text>
			</View>
			<View style={styles.command_line}>
				{parsedCode?.map((codeItem, index) => {
					return <YamlCodeItem codeItem={codeItem} key={index} />;
				})}
			</View>
		</View>
	);
};

export default Yaml;

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
