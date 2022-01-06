import { API_URL } from "../constants/Url";

/** @format */
export async function getCards() {
	const url = `http://${API_URL}/cards/`;
	const requestOptions = {
		method: 'GET',
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
