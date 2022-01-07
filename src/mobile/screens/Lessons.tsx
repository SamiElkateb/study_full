/** @format */

import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getCards, getCourses } from '../API/cards';
import CourseBtn from '../components/Courses/CourseBtn';
import Course from '../DataStructures/Courses';

interface props {}
const Lessons: React.FC<props> = (props) => {
	const [courses, setCourses] = useState([])
	useEffect(()=>{
		getCourses().then((reponse)=>{
			setCourses(reponse.data)
		});
	},[])

	return (
		<View style={styles.container}>
			{
				courses.map((courseData)=>{
					const course = new Course(courseData)
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
