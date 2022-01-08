import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { getChapterByCourseId } from '../API/chapters';
import ChapterBtn from '../components/Learn/LessonBtn';
import CourseBtn from '../components/Learn/CourseBtn';
import Chapter from '../DataStructures/Chapter';
import useCustomTheme from '../hooks/useCustomTheme';
import { chapterData, courseData, lessonData } from '../types/api_interfaces';
import { RootStackParamList } from '../types/types';
import Lesson from '../DataStructures/Lesson';
import { getLessonByChapterId } from '../API/lessons';
import LessonBtn from '../components/Learn/LessonBtn';
import Icon from '../components/UI/Icon';

interface props {
	route: RouteProp<RootStackParamList, 'Lessons'>;
	navigation: NavigationProp<RootStackParamList, 'Lessons'>;
}

const LessonScreen: React.FC<props> = (props) => {
	const { route } = props;
	const { chapterId } = route.params;
	const [lessons, setLessons] = useState<lessonData[]>([]);
	const { theme } = useCustomTheme();

	const [isLoading, setIsLoading] = useState(true);
	const isLessonsEmpty = lessons.length === 0;
	const shouldShowSpinner = isLoading && isLessonsEmpty;

	useEffect(() => {
		getLessonByChapterId(chapterId).then((response) => {
			setIsLoading(false);
			setLessons(response.data);
		});
	}, []);

	return (
		<View style={styles.container}>
			{shouldShowSpinner && (
				<ActivityIndicator
					size="large"
					color={theme.primary}
					style={styles.loading}
				/>
			)}

			{lessons.map((lessonResponse, index, array) => {
				const isLastLesson = index === array.length - 1;
				const lesson = new Lesson(lessonResponse);
				return (
					<>
						<LessonBtn
							key={lesson.id}
							lesson={lesson}
							onClick={() => {}}
						/>
						{!isLastLesson && (
							<Icon
								name="arrowdown"
								size="med"
								color={theme.text}
							/>
						)}
					</>
				);
			})}
		</View>
	);
};

export default LessonScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	loading: {
		alignSelf: 'center',
		marginTop: 40,
	},
});
