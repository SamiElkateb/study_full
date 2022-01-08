import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getCourses } from '../API/courses';
import CourseBtn from '../components/Learn/CourseBtn';
import Loading from '../components/UI/Loading';
import Course from '../DataStructures/Courses';
import { courseData } from '../types/api_interfaces';

const CourseScreen: React.FC = (props) => {
	const navigation = useNavigation();
	const [courses, setCourses] = useState<courseData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getCourses().then((response) => {
			setIsLoading(false);
			setCourses(response.data);
		});
	}, []);

	const navigateToChapterHandler = (courseId: number) => {
		navigation.navigate('Chapters', { courseId });
	};

	return (
		<View style={styles.container}>
			{isLoading && <Loading />}

			{courses.map((courseResponse) => {
				const course = new Course(courseResponse);
				return (
					<CourseBtn
						key={course.id}
						course={course}
						onClick={navigateToChapterHandler.bind(null, course.id)}
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
});
