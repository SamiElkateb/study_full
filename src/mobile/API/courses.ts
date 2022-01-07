import { API_URL } from "../constants/Url";

/** @format */

export async function getCourses() {
	const url = `http://${API_URL}/api/courses`;
	const requestOptions = {
		method: 'GET',
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getCourse(id: number) {
	const url = `http://${API_URL}/api/courses`;

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