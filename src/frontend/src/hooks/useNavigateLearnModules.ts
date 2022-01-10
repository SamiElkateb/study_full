import React, { useEffect, useReducer, Reducer } from 'react';
import { getChapterByCourseId } from '../API/chapters';
import { getCourses } from '../API/courses';
import { getLessonByChapterId } from '../API/lessons';
import { Chapter, Course, Lesson } from '../DataStructures/LearnModule';
interface learnModuleState {
	courses: Course[];
	chapters: Chapter[];
	lessons: Lesson[];
	selectedCourse?: number | undefined;
	selectedChapter?: number | undefined;
	selectedLesson?: number | undefined;
}
interface action {
	type:
		| 'SET_COURSES'
		| 'SET_CHAPTERS'
		| 'SET_LESSONS'
		| 'UPDATE_CHAPTERS'
		| 'UPDATE_LESSONS';
	courses?: Course[];
	chapters?: Chapter[];
	lessons?: Lesson[];
	selectedCourse?: number | undefined;
	selectedChapter?: number | undefined;
	selectedLesson?: number | undefined;
}
const initialLearnModuleState = {
	courses: [],
	chapters: [],
	lessons: [],
	selectedCourse: undefined,
	selectedChapter: undefined,
	selectedLesson: undefined,
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
		const selectedCourse = undefined;
		const selectedChapter = undefined;
		const selectedLesson = undefined;
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
		const selectedChapter = undefined;
		const selectedLesson = undefined;
		return {
			...prevState,
			chapters,
			lessons,
			selectedCourse,
			selectedChapter,
			selectedLesson,
		};
	}
	if (action.type === 'UPDATE_CHAPTERS') {
		if (typeof action.chapters === 'undefined') return prevState;
		const chapters: Chapter[] = action.chapters;
		return { ...prevState, chapters };
	}
	if (action.type === 'SET_LESSONS') {
		if (typeof action.lessons === 'undefined') return prevState;
		const lessons: Lesson[] = action.lessons;
		const selectedChapter = action.selectedChapter;
		const selectedLesson = undefined;
		return { ...prevState, lessons, selectedChapter, selectedLesson };
	}
	if (action.type === 'UPDATE_LESSONS') {
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

	const {
		courses,
		chapters,
		lessons,
		selectedCourse,
		selectedChapter,
		selectedLesson,
	} = learnModuleState;

	const showChapters = chapters.length > 0 || selectedCourse;
	const showLessons = lessons.length > 0 || selectedChapter;

	useEffect(() => {
		getCourses().then((response) => {
			const coursesMap = response.data.map((courseResponse) => {
				return new Course(courseResponse);
			});
			dispatch({ type: 'SET_COURSES', courses: coursesMap });
		});
	}, []);

	const updateCoursesHandler = () => {
		getCourses().then((response) => {
			const coursesMap = response.data.map((courseResponse) => {
				return new Course(courseResponse);
			});
			dispatch({ type: 'SET_COURSES', courses: coursesMap });
		});
	};

	const updateChaptersHandler = () => {
		if (!selectedCourse) return;
		getChapterByCourseId(selectedCourse).then((response) => {
			const chaptersMap = response.data.map((chapterResponse) => {
				return new Chapter(chapterResponse);
			});
			dispatch({
				type: 'UPDATE_CHAPTERS',
				chapters: chaptersMap,
			});
		});
	};
	const updateLessonsHandler = () => {
		if (!selectedChapter) return;
		getLessonByChapterId(selectedChapter).then((response) => {
			const lessonsMap = response.data.map((lessonResponse) => {
				return new Lesson(lessonResponse);
			});
			dispatch({
				type: 'UPDATE_LESSONS',
				lessons: lessonsMap,
			});
		});
	};

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
		updateCoursesHandler,
		updateChaptersHandler,
		updateLessonsHandler,
	};
};

export default useNavigateLearnModules;
