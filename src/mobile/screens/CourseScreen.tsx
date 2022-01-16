import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getCourses } from '../API/courses';
import CourseBtn from '../components/Learn/CourseBtn';
import Loading from '../components/UI/Loading';
import { CourseManager } from '../database/LearnModuleManager';
import { Course } from '../DataStructures/LearnModule';
import useAuth from '../hooks/useAuth';
import { courseData } from '../types/api_interfaces';

const CourseScreen: React.FC = (props) => {
	const navigation = useNavigation();
	const [courses, setCourses] = useState<Course[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const courseManager = new CourseManager();
		courseManager.get().then((response) => {
			setIsLoading(false);
			const courseMap = response.map(
				(courseResponse) => new Course(courseResponse)
			);
			setCourses(courseMap);
		});
	}, []);

	const navigateToChapterHandler = (courseId: number) => {
		navigation.navigate('Chapters', { courseId });
	};

	return (
		<View style={styles.container}>
			{isLoading && <Loading />}

			{courses.length > 0 && (
				<FlatList
					data={courses}
					keyExtractor={(course) => course.id.toString()}
					renderItem={({ item }) => (
						<CourseBtn
							course={item}
							onClick={navigateToChapterHandler.bind(
								null,
								item.id
							)}
						/>
					)}
				/>
			)}
		</View>
	);
};

export default CourseScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
