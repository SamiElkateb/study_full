import { Chapter, Course, Lesson } from '../DataStructures/LearnModule';
import {
	anyLearnModuleAdd,
	anyLearnModuleUpdate,
} from '../types/api_interfaces';
import { learnModule, learnModuleType } from '../types/learnModules';
import { addChapter, deleteChapter, updateChapter } from './chapters';
import { addCourse, deleteCourse, updateCourse } from './courses';
import { addLesson, deleteLesson, updateLesson } from './lessons';

export async function updateLearnModule(
	learnModule: anyLearnModuleUpdate | learnModule,
	type: learnModuleType
) {
	console.log(learnModule);
	if (learnModule instanceof Course) return updateCourse(learnModule);
	if (learnModule instanceof Chapter) return updateChapter(learnModule);
	if (learnModule instanceof Lesson) return updateLesson(learnModule);
	if (type === 'course') return updateCourse(learnModule);
	if (type === 'chapter') return updateChapter(learnModule);
	if (type === 'lesson') return updateLesson(learnModule);
}

export async function deleteLearnModule(
	learnModule: number | learnModule,
	type?: learnModuleType
) {
	if (learnModule instanceof Course) return deleteCourse(learnModule.id);
	if (learnModule instanceof Chapter) return deleteChapter(learnModule.id);
	if (learnModule instanceof Lesson) return deleteLesson(learnModule.id);
	if (type === 'course') return deleteCourse(learnModule);
	if (type === 'chapter') return deleteChapter(learnModule);
	if (type === 'lesson') return deleteLesson(learnModule);
}

export async function addLearnModule(
	learnModule: anyLearnModuleAdd | learnModule,
	type?: learnModuleType
) {
	if (learnModule instanceof Course) return addCourse(learnModule);
	if (learnModule instanceof Chapter) return addChapter(learnModule);
	if (learnModule instanceof Lesson) return addLesson(learnModule);
	if (type === 'course') return addCourse(learnModule);
	if (type === 'chapter') return addChapter(learnModule);
	if (type === 'lesson') return addLesson(learnModule);
}
