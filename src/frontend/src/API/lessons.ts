import { API_URL } from '../constants/Url';
import {
	apiPostResponse,
	apiResponse,
	lessonData,
	lessonPost,
} from '../types/api_interfaces';

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

export async function addLesson(
	postData: lessonPost
): Promise<apiPostResponse> {
	const { title, chapterId, creatorId, visibility, rank } = postData;
	if (chapterId === 0) throw 'ChapterId = 0';
	const formData = new FormData();
	formData.append('title', title);
	formData.append('chapter_id', chapterId.toString());
	formData.append('creator_id', creatorId.toString());
	formData.append('rank', rank.toString());
	formData.append('visibility', visibility.toString());

	const url = `http://${API_URL}/api/lessons`;

	const requestOptions = {
		method: 'POST',
		body: formData,
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
