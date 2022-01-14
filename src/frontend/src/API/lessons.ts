import { API_URL } from '../constants/Url';
import {
	apiPostResponse,
	apiResponse,
	lessonData,
	lessonPost,
	lessonPut,
} from '../types/api_interfaces';

export async function getLessons(
	token: string
): Promise<apiResponse<lessonData>> {
	const url = `http://${API_URL}/api/lessons`;
	const requestOptions = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getLesson(
	id: number,
	token: string
): Promise<apiResponse<lessonData>> {
	const params = new URLSearchParams({
		id: id.toString(),
	});
	const url = `http://${API_URL}/api/lessons?${params}`;

	const requestOptions = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getLessonByChapterId(
	courseId: number,
	token: string
): Promise<apiResponse<lessonData>> {
	const params = new URLSearchParams({
		course_id: courseId.toString(),
	});

	const url = `http://${API_URL}/api/lessons?${params}`;

	const requestOptions = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function addLesson(
	postData: lessonPost,
	token: string
): Promise<apiPostResponse> {
	const { title, chapterId, creatorId, visibility, rank } = postData;
	if (!chapterId) throw 'chapterId undefined';

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
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
export async function updateLesson(
	postData: lessonPut,
	token: string
): Promise<apiPostResponse> {
	const { id, chapterId, creatorId } = postData;
	if (!id) throw 'update id undefined';
	if (!chapterId) throw 'chapterId undefined';

	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/lessons?${params}`;
	const bodyObject = {
		...postData,
		chapter_id: chapterId,
		creator_id: creatorId,
	};

	const requestOptions = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(bodyObject),
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function deleteLesson(
	id: number,
	token: string
): Promise<apiPostResponse> {
	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/lessons?${params}`;

	const requestOptions = {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
