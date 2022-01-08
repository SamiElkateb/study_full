import {
	NavigationProp,
	RouteProp,
	useNavigation,
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { getChapterByCourseId } from '../API/chapters';
import CourseBtn from '../components/Learn/CourseBtn';
import Chapter from '../DataStructures/Chapter';
import useCustomTheme from '../hooks/useCustomTheme';
import { chapterData, courseData } from '../types/api_interfaces';
import { RootStackParamList } from '../types/types';

interface props {
	route: RouteProp<RootStackParamList, 'Chapters'>;
	navigation: NavigationProp<RootStackParamList, 'Chapters'>;
}

const ChapterScreen: React.FC<props> = (props) => {
	const navigation = useNavigation();
	const { route } = props;
	const { courseId } = route.params;
	const [chapters, setChapters] = useState<chapterData[]>([]);
	const { theme } = useCustomTheme();

	const [isLoading, setIsLoading] = useState(true);
	const isChaptersEmpty = chapters.length === 0;
	const shouldShowSpinner = isLoading && isChaptersEmpty;

	useEffect(() => {
		getChapterByCourseId(courseId).then((response) => {
			setIsLoading(false);
			setChapters(response.data);
		});
	}, []);

	const onNavigateToLesson = (chapterId: number) => {
		navigation.navigate('Lessons', { chapterId });
	};

	return (
		<View style={styles.container}>
			{shouldShowSpinner && (
				<ActivityIndicator
					size="large"
					color={theme.primary}
					style={styles.loading}
				/>
			)}

			{chapters.map((chapterResponse) => {
				const chapter = new Chapter(chapterResponse);
				return (
					<CourseBtn
						key={chapter.id}
						course={chapter}
						onClick={onNavigateToLesson.bind(null, chapter.id)}
					/>
				);
			})}
		</View>
	);
};

export default ChapterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loading: {
		alignSelf: 'center',
		marginTop: 40,
	},
});
