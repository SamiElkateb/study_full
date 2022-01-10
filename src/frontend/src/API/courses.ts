import { API_URL } from '../constants/Url';
import { courseData, apiResponse } from '../types/api_interfaces';

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