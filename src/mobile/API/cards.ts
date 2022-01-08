import { API_URL } from '../constants/Url';
import { apiResponse, cardData } from '../types/api_interfaces';

export async function getCards() {
	const url = `http://${API_URL}/api/cards`;
	const requestOptions = {
		method: 'GET',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function getCardsByLessonId(
	lessonId: number
): Promise<apiResponse<cardData>> {
	const params = new URLSearchParams({
		lesson_id: lessonId.toString(),
	});
	const url = `http://${API_URL}/api/cards?${params}`;

	const requestOptions = {
		method: 'GET',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
