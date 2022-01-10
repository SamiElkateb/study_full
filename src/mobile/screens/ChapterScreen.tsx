import {
	NavigationProp,
	RouteProp,
	useNavigation,
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getChapterByCourseId } from '../API/chapters';
import CourseBtn from '../components/Learn/CourseBtn';
import Loading from '../components/UI/Loading';
import { Chapter } from '../DataStructures/LearnModule';
import { chapterData } from '../types/api_interfaces';
import { RootStackParamList } from '../types/types';

interface props {
	route: RouteProp<RootStackParamList, 'Chapters'>;
	navigation: NavigationProp<RootStackParamList, 'Chapters'>;
}

const ChapterScreen: React.FC<props> = (props) => {
	const navigation = useNavigation();
	const courseId = props.route.params.courseId;
	const [chapters, setChapters] = useState<chapterData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getChapterByCourseId(courseId).then((response) => {
			setIsLoading(false);
			setChapters(response.data);
		});
	}, []);

	const navigateToLessonHandler = (chapterId: number) => {
		navigation.navigate('Lessons', { chapterId });
	};

	return (
		<View style={styles.container}>
			{isLoading && <Loading />}

			{chapters.map((chapterResponse) => {
				const chapter = new Chapter(chapterResponse);
				return (
					<CourseBtn
						key={chapter.id}
						course={chapter}
						onClick={navigateToLessonHandler.bind(null, chapter.id)}
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
});
