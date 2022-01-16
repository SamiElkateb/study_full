/** @format */

import { iconNamesType } from './types';

export interface apiResponse<T> {
	ok: boolean;
	status: number;
	message: string;
	data: T[];
}

export interface apiPostResponse {
	ok: boolean;
	status: number;
	message: string;
}

export interface courseData {
	id: number;
	title: string;
	icon_name: string;
	color: string;
	creator_id: number;
	rank: number;
	visibility: number;
	created: string;
	modified: string;
}

export interface chapterData {
	id: number;
	title: string;
	icon_name: string;
	color: string;
	course_id: number;
	creator_id: number;
	rank: number;
	visibility: number;
	created: string;
	modified: string;
}

export interface lessonData {
	id: number;
	title: string;
	chapter_id: number;
	creator_id: number;
	rank: number;
	visibility: number;
	created: string;
	modified: string;
}

export interface flashcardData {
	id: number;
	question: string;
	answer: string;
	answer_type: string;
	lesson_id: number;
	created: string;
	modified: string;
}

export interface coursePost {
	title: string;
	iconName?: iconNamesType;
	color?: string;
	creatorId: number;
	rank: number;
	visibility: number;
}

export interface chapterPost {
	title: string;
	iconName?: iconNamesType;
	color?: string;
	courseId?: number;
	creatorId: number;
	rank: number;
	visibility: number;
}

export interface lessonPost {
	title: string;
	chapterId?: number;
	creatorId: number;
	rank: number;
	visibility: number;
}

export interface flashcardAdd {
	question: string;
	answer: string;
	answerType: string;
	lessonId?: number;
}

export interface anyLearnModuleAdd {
	title: string;
	creatorId: number;
	iconName?: iconNamesType;
	color?: string;
	rank: number;
	visibility: number;
	courseId?: number;
	chapterId?: number;
}

export type learnModuleAdd =
	| coursePost
	| chapterPost
	| lessonPost
	| anyLearnModuleAdd;

export interface coursePut {
	id?: number;
	title: string;
	iconName?: iconNamesType;
	color?: string;
	creatorId: number;
	rank: number;
	visibility: number;
}

export interface chapterPut {
	id?: number;
	title: string;
	iconName?: iconNamesType;
	color?: string;
	courseId?: number;
	creatorId: number;
	rank: number;
	visibility: number;
}

export interface lessonPut {
	id?: number;
	title: string;
	chapterId?: number;
	creatorId: number;
	rank: number;
	visibility: number;
}

export interface flashcardUpdate {
	id?: number;
	question: string;
	answer: string;
	answerType: string;
	lessonId?: number;
}
export interface anyLearnModuleUpdate {
	id?: number;
	title: string;
	creatorId: number;
	iconName?: iconNamesType;
	color?: string;
	rank: number;
	visibility: number;
	courseId?: number;
	chapterId?: number;
}

export type learnModuleUpdate =
	| coursePost
	| chapterPost
	| lessonPost
	| anyLearnModuleAdd;

export interface registerData {
	email: string;
	password: string;
}
export interface loginData {
	email: string;
	password: string;
}
export interface loginResponse {
	ok: boolean;
	status: number;
	message: string;
	jwt: string;
	id: number;
}
