/** @format */

import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Course } from '../../DataStructures/LearnModule';
import useCustomTheme from '../../hooks/useCustomTheme';
import { iconNames } from '../../types/types';
import Icon from '../UI/Icon';
import ProgressBar from '../UI/ProgressBar';

interface props {
	course: Course;
	onClick: () => void;
	progress?: number;
}
const CourseBtn: React.FC<props> = (props) => {
	const { course, onClick, progress = 0 } = props;
	const { title, iconName, color } = course;
	const { themeStyle } = useCustomTheme();
	return (
		<TouchableOpacity
			onPress={onClick}
			style={[styles.button_container, themeStyle.surface]}
			activeOpacity={0.7}
		>
			<View style={styles.button}>
				<View style={styles.title_container}>
					<Icon name={iconName} size="med" color={color} />
					<Text style={[styles.title, themeStyle.text]}>{title}</Text>
				</View>
				<ProgressBar progress={progress} />
			</View>
		</TouchableOpacity>
	);
};

export default CourseBtn;

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
