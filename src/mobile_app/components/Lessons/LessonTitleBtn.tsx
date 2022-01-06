/** @format */

import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useCustomTheme from '../../hooks/useCustomTheme';
import { iconNames } from '../../types';
import Icon from '../UI/Icon';
import ProgressBar from '../UI/ProgressBar';

interface props {
	icon: iconNames;
	title: string;
	color: string;
	onClick: () => void;
	progress?: number;
}
const LessonTitleBtn: React.FC<props> = (props) => {
	const { title, icon, color, onClick, progress = 0 } = props;
	const { themeStyle } = useCustomTheme();
	return (
		<TouchableOpacity
			onPress={onClick}
			style={[styles.button_container, themeStyle.card]}
			activeOpacity={0.7}
		>
			<View style={styles.button}>
				<View style={styles.title_container}>
					<Icon name={icon} size="med" color={color} />
					<Text style={[styles.title, themeStyle.text]}>{title}</Text>
				</View>
				<ProgressBar progress={progress} />
			</View>
		</TouchableOpacity>
	);
};

export default LessonTitleBtn;

const styles = StyleSheet.create({
	button: {
		overflow: 'hidden',
		borderRadius: 20,
	},
	button_container: {
		borderRadius: 20,
		marginHorizontal: 24,
		marginVertical: 16,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
	},
	title_container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 20,
	},
	title: {
		fontSize: 24,
		marginLeft: 16,
		fontWeight: 'bold',
	},
});
