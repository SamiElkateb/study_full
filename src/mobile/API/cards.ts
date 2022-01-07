import { API_URL } from '../constants/Url';

export async function getCards() {
	const url = `http://${API_URL}/api/cards`;
	const requestOptions = {
		method: 'GET',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
