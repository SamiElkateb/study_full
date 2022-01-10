import React, { useEffect, useReducer, Reducer } from 'react';
import { getChapterByCourseId } from '../API/chapters';
import { getCourses } from '../API/courses';
import { getLessonByChapterId } from '../API/lessons';
import { Chapter, Course, Lesson } from '../DataStructures/LearnModule';
interface learnModuleState {
	courses: Course[];
	chapters: Chapter[];
	lessons: Lesson[];
	selectedCourse?: number | null;
	selectedChapter?: number | null;
	selectedLesson?: number | null;
}
interface action {
	type: 'SET_COURSES' | 'SET_CHAPTERS' | 'SET_LESSONS';
	courses?: Course[];
	chapters?: Chapter[];
	lessons?: Lesson[];
	selectedCourse?: number | null;
	selectedChapter?: number | null;
	selectedLesson?: number | null;
}
const initialLearnModuleState = {
	courses: [],
	chapters: [],
	lessons: [],
	selectedCourse: null,
	selectedChapter: null,
	selectedLesson: null,
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
		const selectedCourse = null;
		const selectedChapter = null;
		const selectedLesson = null;
		return {
			...prevState,
			courses,
			chapters,
			lessons,
			selectedCourse,
			selectedChapter,
			selectedLesson,
		};
	}
	if (action.type === 'SET_CHAPTERS') {
		if (typeof action.chapters === 'undefined') return prevState;
		const chapters: Chapter[] = action.chapters;
		const lessons: Lesson[] = [];
		const selectedCourse = action.selectedCourse;
		const selectedChapter = null;
		const selectedLesson = null;
		return {
			...prevState,
			chapters,
			lessons,
			selectedCourse,
			selectedChapter,
			selectedLesson,
		};
	}
	if (action.type === 'SET_LESSONS') {
		if (typeof action.lessons === 'undefined') return prevState;
		const lessons: Lesson[] = action.lessons;
		const selectedChapter = action.selectedChapter;
		const selectedLesson = null;
		return { ...prevState, lessons, selectedChapter, selectedLesson };
	}

	return prevState;
};

const useNavigateLearnModules = () => {
	const [learnModuleState, dispatch] = useReducer(
		learnModuleReducer,
		initialLearnModuleState
	);

	const {
		courses,
		chapters,
		lessons,
		selectedCourse,
		selectedChapter,
		selectedLesson,
	} = learnModuleState;

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
			dispatch({
				type: 'SET_CHAPTERS',
				chapters: chaptersMap,
				selectedCourse: id,
			});
		});
	};

	const navigateToLessonHandler = (id: number) => {
		getLessonByChapterId(id).then((response) => {
			const lessonsMap = response.data.map((lessonResponse) => {
				return new Lesson(lessonResponse);
			});
			dispatch({
				type: 'SET_LESSONS',
				lessons: lessonsMap,
				selectedChapter: id,
			});
		});
	};

	return {
		showChapters,
		showLessons,
		courses,
		chapters,
		lessons,
		selectedCourse,
		selectedChapter,
		selectedLesson,
		navigateToChapterHandler,
		navigateToLessonHandler,
	};
};

export default useNavigateLearnModules;
