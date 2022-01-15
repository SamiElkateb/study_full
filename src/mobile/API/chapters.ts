import { API_URL } from '../constants/Url';
import {
	apiPostResponse,
	apiResponse,
	chapterData,
	chapterPost,
	chapterPut,
} from '../types/api_interfaces';

export async function getChapters(
	token: string
): Promise<apiResponse<chapterData>> {
	const url = `http://${API_URL}/api/chapters`;
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

export async function getChapter(
	id: number,
	token: string
): Promise<apiResponse<chapterData>> {
	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/chapters?${params}`;

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

export async function getChapterByCourseId(
	courseId: number,
	token: string
): Promise<apiResponse<chapterData>> {
	const params = new URLSearchParams({
		course_id: courseId.toString(),
	});
	const url = `http://${API_URL}/api/chapters?${params}`;

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

export async function addChapter(
	postData: chapterPost,
	token: string
): Promise<apiPostResponse> {
	const { title, iconName, color, courseId, creatorId, visibility, rank } =
		postData;
	if (!courseId || !iconName || !color) throw 'Missing data';
	const formData = new FormData();
	formData.append('title', title);
	formData.append('icon_name', iconName);
	formData.append('color', color);
	formData.append('course_id', courseId.toString());
	formData.append('creator_id', creatorId.toString());
	formData.append('rank', rank.toString());
	formData.append('visibility', visibility.toString());

	const url = `http://${API_URL}/api/chapters`;

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

export async function updateChapter(
	postData: chapterPut,
	token: string
): Promise<apiPostResponse> {
	const { id, iconName, courseId, creatorId, color } = postData;
	if (!id || !courseId || !iconName || !color) throw 'Missing data';

	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/chapters?${params}`;
	const bodyObject = {
		...postData,
		icon_name: iconName,
		course_id: courseId,
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

export async function deleteChapter(
	id: number,
	token: string
): Promise<apiPostResponse> {
	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/chapters?${params}`;

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
