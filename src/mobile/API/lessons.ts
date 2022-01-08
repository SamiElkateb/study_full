import { API_URL } from '../constants/Url';
import { apiResponse, lessonData } from '../types/api_interfaces';

export async function getLessons(): Promise<apiResponse<lessonData>> {
	const url = `http://${API_URL}/api/lessons`;
	const requestOptions = {
		method: 'GET',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getLesson(id: number): Promise<apiResponse<lessonData>> {
	const params = new URLSearchParams({
		id: id.toString(),
	});
	const url = `http://${API_URL}/api/lessons?${params}`;

	const requestOptions = {
		method: 'GET',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getLessonByChapterId(
	courseId: number
): Promise<apiResponse<lessonData>> {
	const params = new URLSearchParams({
		course_id: courseId.toString(),
	});

	const url = `http://${API_URL}/api/lessons?${params}`;

	const requestOptions = {
		method: 'GET',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
