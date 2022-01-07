/** @format */

import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getCourses } from '../API/courses';
import CourseBtn from '../components/Courses/CourseBtn';
import Course from '../DataStructures/Courses';
import { courseData } from '../types/api_interfaces';

interface props {}
const Lessons: React.FC<props> = (props) => {
	const [courses, setCourses] = useState<courseData[]>([])
	useEffect(()=>{
		getCourses().then((reponse)=>{
			setCourses(reponse.data)
		});
	},[])

	return (
		<View style={styles.container}>
			{
				courses.map((courseResponse)=>{
					const course = new Course(courseResponse)
					return <CourseBtn key={course.id} course={course} onClick={()=>{}} />
				})
			}
		</View>
	);
};

export default Lessons;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
