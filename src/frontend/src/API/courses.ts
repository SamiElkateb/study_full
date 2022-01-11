import { API_URL } from '../constants/Url';
import {
	courseData,
	apiResponse,
	coursePost,
	apiPostResponse,
	coursePut,
} from '../types/api_interfaces';

export async function getCourses(): Promise<apiResponse<courseData>> {
	const url = `http://${API_URL}/api/courses`;
	const requestOptions = {
		method: 'GET',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getCourse(id: number): Promise<apiResponse<courseData>> {
	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/courses?${params}`;

	const requestOptions = {
		method: 'GET',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function addCourse(
	postData: coursePost
): Promise<apiPostResponse> {
	const { title, iconName, color, visibility, rank, creatorId } = postData;
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
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function updateCourse(
	postData: coursePut
): Promise<apiPostResponse> {
	const { id, iconName, creatorId } = postData;
	if (!id) throw 'update id undefined';

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
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(bodyObject),
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function deleteCourse(id: number): Promise<apiPostResponse> {
	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/courses?${params}`;

	const requestOptions = {
		method: 'DELETE',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
