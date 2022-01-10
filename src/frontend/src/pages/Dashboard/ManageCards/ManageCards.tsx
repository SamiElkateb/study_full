import { useEffect, useState } from 'react';
import { getCourses } from '../../../API/courses';
import LearnCard from '../../../components/Learn/LearnCard/LearnCard';
import Card from '../../../components/UI/Card/Card';
import Carousel from '../../../components/UI/Carousel/Carousel';
import { Course } from '../../../DataStructures/LearnModule';
import { courseData } from '../../../types/api_interfaces';
import classes from './ManageCards.module.scss';

const ManageCards: React.FC = (props) => {
	const [courses, setCourses] = useState<Course[]>([]);
	useEffect(() => {
		getCourses().then((response) => {
			const courses = response.data.map((courseResponse) => {
				return new Course(courseResponse);
			});
			setCourses(courses);
		});
	}, []);

	const navigateToChapterHandler = (courseId: number) => {};
	return (
		<>
			<h1>Manage Cards</h1>
			<h2>Courses</h2>
			<Carousel list={courses} />
			<h2>Chapters</h2>

			<h2>Chapters</h2>
		</>
	);
};

export default ManageCards;
