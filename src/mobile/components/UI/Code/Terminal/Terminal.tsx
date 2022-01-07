/** @format */

import { StyleSheet, View, Text } from 'react-native';
import codeParser from '../../../../helpers/codeParser/codeParser';

interface props {
	code: string;
}

const Terminal: React.FC<props> = (props) => {
	const { code } = props;
	let parsedCode = codeParser(code, 'terminal')

	return (
		<View style={styles.terminal}>
			<View style={styles.title}>
				<Text style={styles.title_text}>Terminal</Text>
			</View>
			<View style={styles.command_line}>
				{parsedCode?.map((element, index) => {
					if (typeof element === 'string') {
						return <Text style={styles.text} key={index}>{element}</Text>;
					}
					return (
						<Text key={index} style={styles.variable}>
							{element.text}
						</Text>
					);
				})}
			</View>
		</View>
	);
};

export default Terminal;

const styles = StyleSheet.create({
	terminal: {
		backgroundColor:'#1e1e1e',
		paddingVertical:16,

	},
	title:{
		marginBottom:16,
		paddingBottom:8,
		paddingHorizontal:16,
		borderBottomColor:'white',
		borderBottomWidth:2
	},
	title_text:{
		color: 'white',
		fontWeight:'bold',
		fontFamily:'Menlo'
	},
	text:{
		color: 'white',
		paddingVertical: 4,
		fontFamily:'Menlo',
		fontSize:12
	},
	command_line: {
		paddingHorizontal:16,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	variable: {
		backgroundColor: 'grey',
		fontWeight:'bold',
		padding: 4,
		borderRadius: 8,
		overflow: 'hidden',
		fontFamily:'Menlo',
		fontSize:12
	},
});
