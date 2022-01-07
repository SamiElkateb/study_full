import { API_URL } from "../constants/Url";

/** @format */
export async function getCards() {
	const url = `http://${API_URL}/api/cards`;
	const requestOptions = {
		method: 'GET',
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getCourses() {
	const url = `http://${API_URL}/api/courses`;
	const requestOptions = {
		method: 'GET',
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}