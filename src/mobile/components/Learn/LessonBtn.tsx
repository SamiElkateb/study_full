import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Lesson } from '../../DataStructures/LearnModule';
import useCustomTheme from '../../hooks/useCustomTheme';
import Icon from '../UI/Icon';

interface props {
	lesson: Lesson;
	onClick: () => void;
	isDone?: boolean;
}
const LessonBtn: React.FC<props> = (props) => {
	const { lesson, onClick, isDone = false } = props;
	const { theme, themeStyle } = useCustomTheme();
	return (
		<TouchableOpacity
			onPress={onClick}
			style={[styles.button_container, themeStyle.card]}
			activeOpacity={0.7}
		>
			<View style={styles.button}>
				{isDone && (
					<View style={styles.done}>
						<Icon
							name="done"
							size="x-small"
							color={theme.correct}
						/>
					</View>
				)}
				<Text style={[styles.title, themeStyle.text]}>
					{lesson.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default LessonBtn;

const styles = StyleSheet.create({
	button: {
		overflow: 'hidden',
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 24,
	},
	button_container: {
		borderRadius: 12,
		marginHorizontal: 24,
		marginVertical: 16,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3,
	},
	done: {
		position: 'absolute',
		right: 6,
		top: 6,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
