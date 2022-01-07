import { API_URL } from "../constants/Url";

/** @format */

export async function getChapters() {
	const url = `http://${API_URL}/api/chapters`;
	const requestOptions = {
		method: 'GET',
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getChapter(id: number) {
	const url = `http://${API_URL}/api/chapters`;

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

export async function getChapterByCourseId(courseId: number) {
	const url = `http://${API_URL}/api/chapters`;

	const formData = new FormData();
	formData.append('course_id', courseId.toString());

	const requestOptions = {
		method: 'GET',
		body:formData
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}