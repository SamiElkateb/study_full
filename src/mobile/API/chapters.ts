import { API_URL } from '../constants/Url';
import { apiResponse, chapterData } from '../types/api_interfaces';

export async function getChapters(): Promise<apiResponse<chapterData>> {
	const url = `http://${API_URL}/api/chapters`;
	const requestOptions = {
		method: 'GET',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getChapter(
	id: number
): Promise<apiResponse<chapterData>> {
	const url = `http://${API_URL}/api/chapters`;

	const formData = new FormData();
	formData.append('id', id.toString());

	const requestOptions = {
		method: 'GET',
		body: formData,
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getChapterByCourseId(
	courseId: number
): Promise<apiResponse<chapterData>> {
	const url = `http://${API_URL}/api/chapters`;

	const formData = new FormData();
	formData.append('course_id', courseId.toString());

	const requestOptions = {
		method: 'GET',
		body: formData,
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
