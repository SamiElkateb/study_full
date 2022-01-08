import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { getCourses } from '../API/courses';
import CourseBtn from '../components/Learn/CourseBtn';
import Course from '../DataStructures/Courses';
import useCustomTheme from '../hooks/useCustomTheme';
import { courseData } from '../types/api_interfaces';

const CourseScreen: React.FC = (props) => {
	const navigation = useNavigation();
	const [courses, setCourses] = useState<courseData[]>([]);
	const { theme } = useCustomTheme();

	const [isLoading, setIsLoading] = useState(true);
	const isCoursesEmpty = courses.length === 0;
	const shouldShowSpinner = isLoading && isCoursesEmpty;

	useEffect(() => {
		getCourses().then((response) => {
			setIsLoading(false);
			setCourses(response.data);
		});
	}, []);

	const onNavigateToChapter = (courseId: number) => {
		navigation.navigate('Chapters', { courseId });
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

			{courses.map((courseResponse) => {
				const course = new Course(courseResponse);
				return (
					<CourseBtn
						key={course.id}
						course={course}
						onClick={onNavigateToChapter.bind(null, course.id)}
					/>
				);
			})}
		</View>
	);
};

export default CourseScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loading: {
		alignSelf: 'center',
		marginTop: 40,
	},
});
