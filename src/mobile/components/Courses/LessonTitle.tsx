/** @format */

import { Text, StyleSheet, View } from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import { iconNames } from '../../types';
import Icon from '../UI/Icon';

interface props {
	icon: iconNames;
	title: string;
	color: string;
}
const LessonTitle: React.FC<props> = (props) => {
	const { title, icon, color } = props;
	const { themeStyle } = useCustomTheme();
	return (
		<View style={styles.title_container}>
			<Icon name={icon} size="large" color={color} />
			<Text style={[styles.title, themeStyle.text]}>{title}</Text>
		</View>
	);
};

export default LessonTitle;

const styles = StyleSheet.create({
	title_container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 12,
	},
	title: {
		fontSize: 28,
		marginLeft: 16,
		fontWeight: 'bold',
	},
});
