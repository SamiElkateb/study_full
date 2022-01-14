import { Chapter, Course, Lesson } from '../DataStructures/LearnModule';
import {
	anyLearnModuleAdd,
	anyLearnModuleUpdate,
} from '../types/api_interfaces';
import { learnModule, learnModuleType } from '../types/learnModules';
import { addChapter, deleteChapter, updateChapter } from './chapters';
import { addCourse, deleteCourse, updateCourse } from './courses';
import { addLesson, deleteLesson, updateLesson } from './lessons';

interface updateOrAddParams {
	learnModule: anyLearnModuleUpdate | learnModule;
	token: string;
	type?: learnModuleType;
}
export async function addLearnModule(params: updateOrAddParams) {
	const { learnModule, token, type } = params;
	if (learnModule instanceof Course) return addCourse(learnModule, token);
	if (learnModule instanceof Chapter) return addChapter(learnModule, token);
	if (learnModule instanceof Lesson) return addLesson(learnModule, token);
	if (type === 'course') return addCourse(learnModule, token);
	if (type === 'chapter') return addChapter(learnModule, token);
	if (type === 'lesson') return addLesson(learnModule, token);
}

export async function updateLearnModule(params: updateOrAddParams) {
	const { learnModule, token, type } = params;
	if (learnModule instanceof Course) return updateCourse(learnModule, token);
	if (learnModule instanceof Chapter)
		return updateChapter(learnModule, token);
	if (learnModule instanceof Lesson) return updateLesson(learnModule, token);
	if (type === 'course') return updateCourse(learnModule, token);
	if (type === 'chapter') return updateChapter(learnModule, token);
	if (type === 'lesson') return updateLesson(learnModule, token);
}
interface deleteParams {
	learnModule: learnModule | number;
	token: string;
	type?: learnModuleType;
}
export async function deleteLearnModule(params: deleteParams) {
	const { learnModule, token, type } = params;
	if (learnModule instanceof Course)
		return deleteCourse(learnModule.id, token);
	if (learnModule instanceof Chapter)
		return deleteChapter(learnModule.id, token);
	if (learnModule instanceof Lesson)
		return deleteLesson(learnModule.id, token);
	if (type === 'course') return deleteCourse(learnModule, token);
	if (type === 'chapter') return deleteChapter(learnModule, token);
	if (type === 'lesson') return deleteLesson(learnModule, token);
}
