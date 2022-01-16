import { API_URL } from '../constants/Url';
import {
	courseData,
	apiResponse,
	coursePost,
	apiPostResponse,
	coursePut,
} from '../types/api_interfaces';

export async function getCoursesSinceLastUpdate(
	token: string,
	lastUpdateDate: string
): Promise<apiResponse<courseData>> {
	const params = new URLSearchParams({
		last_update_date: lastUpdateDate,
	});
	const url = `http://${API_URL}/api/courses?${params}`;
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

export async function getCourses(
	token: string
): Promise<apiResponse<courseData>> {
	const url = `http://${API_URL}/api/courses`;
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

export async function getCourse(
	id: number,
	token: string
): Promise<apiResponse<courseData>> {
	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/courses?${params}`;

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

export async function addCourse(
	postData: coursePost,
	token: string
): Promise<apiPostResponse> {
	const { title, iconName, color, visibility, rank, creatorId } = postData;
	if (!iconName || !color) throw 'Missing data';
	const formData = new FormData();
	formData.append('title', title);
	formData.append('icon_name', iconName);
	formData.append('color', color);
	formData.append('rank', rank.toString());
	formData.append('visibility', visibility.toString());
	formData.append('creator_id', creatorId.toString());

	const url = `http://${API_URL}/api/courses`;

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

export async function updateCourse(
	postData: coursePut,
	token: string
): Promise<apiPostResponse> {
	const { id, iconName, creatorId, color } = postData;
	if (!id || !iconName || !color) throw 'Missing data';

	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/courses?${params}`;
	const bodyObject = {
		...postData,
		icon_name: iconName,
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

export async function deleteCourse(
	id: number,
	token: string
): Promise<apiPostResponse> {
	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/courses?${params}`;

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
