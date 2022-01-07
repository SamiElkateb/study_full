/** @format */

export interface apiResponse<T> {
	ok: boolean;
	status: number;
	message: string;
    data:T[];
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