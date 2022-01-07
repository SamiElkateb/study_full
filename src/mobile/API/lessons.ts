import { API_URL } from "../constants/Url";

/** @format */

export async function getLessons() {
	const url = `http://${API_URL}/api/lessons`;
	const requestOptions = {
		method: 'GET',
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getLesson(id: number) {
	const url = `http://${API_URL}/api/lessons`;

	const formData = new FormData();
	formData.append('id', id.toString());

	const requestOptions = {
		method: 'GET',
		body:formData
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getLessonByChapterId(courseId: number) {
	const url = `http://${API_URL}/api/lessons`;

	const formData = new FormData();
	formData.append('chapter_id', courseId.toString());

	const requestOptions = {
		method: 'GET',
		body:formData
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}