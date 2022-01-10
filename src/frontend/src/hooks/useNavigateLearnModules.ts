import React, { useEffect, useReducer, Reducer } from 'react';
import { getChapterByCourseId } from '../API/chapters';
import { getCourses } from '../API/courses';
import { getLessonByChapterId } from '../API/lessons';
import { Chapter, Course, Lesson } from '../DataStructures/LearnModule';
interface learnModuleState {
	courses: Course[];
	chapters: Chapter[];
	lessons: Lesson[];
}
interface action {
	type: 'SET_COURSES' | 'SET_CHAPTERS' | 'SET_LESSONS';
	courses?: Course[];
	chapters?: Chapter[];
	lessons?: Lesson[];
}
const initialLearnModuleState = {
	courses: [],
	chapters: [],
	lessons: [],
};

const learnModuleReducer: Reducer<learnModuleState, action> = (
	prevState,
	action
) => {
	if (action.type === 'SET_COURSES') {
		if (typeof action.courses === 'undefined') return prevState;
		const courses = action.courses;
		const chapters: Chapter[] = [];
		const lessons: Lesson[] = [];
		return { ...prevState, courses, chapters, lessons };
	}
	if (action.type === 'SET_CHAPTERS') {
		if (typeof action.chapters === 'undefined') return prevState;
		const chapters: Chapter[] = action.chapters;
		const lessons: Lesson[] = [];
		return { ...prevState, chapters, lessons };
	}
	if (action.type === 'SET_LESSONS') {
		if (typeof action.lessons === 'undefined') return prevState;
		const lessons: Lesson[] = action.lessons;
		return { ...prevState, lessons };
	}

	return prevState;
};

const useNavigateLearnModules = () => {
	const [learnModuleState, dispatch] = useReducer(
		learnModuleReducer,
		initialLearnModuleState
	);

	const { courses, chapters, lessons } = learnModuleState;

	const showChapters = chapters.length > 0;
	const showLessons = lessons.length > 0;

	useEffect(() => {
		getCourses().then((response) => {
			const coursesMap = response.data.map((courseResponse) => {
				return new Course(courseResponse);
			});
			dispatch({ type: 'SET_COURSES', courses: coursesMap });
		});
	}, []);

	const navigateToChapterHandler = (id: number) => {
		getChapterByCourseId(id).then((response) => {
			const chaptersMap = response.data.map((chapterResponse) => {
				return new Chapter(chapterResponse);
			});
			dispatch({ type: 'SET_CHAPTERS', chapters: chaptersMap });
		});
	};

	const navigateToLessonHandler = (id: number) => {
		getLessonByChapterId(id).then((response) => {
			const lessonsMap = response.data.map((lessonResponse) => {
				return new Lesson(lessonResponse);
			});
			dispatch({ type: 'SET_LESSONS', lessons: lessonsMap });
		});
	};

	return {
		showChapters,
		showLessons,
		courses,
		chapters,
		lessons,
		navigateToChapterHandler,
		navigateToLessonHandler,
	};
};

export default useNavigateLearnModules;
