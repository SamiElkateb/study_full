import { API_URL } from '../constants/Url';
import {
	apiPostResponse,
	apiResponse,
	cardAdd,
	cardData,
	cardUpdate,
} from '../types/api_interfaces';

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

export async function addCard(postData: cardAdd): Promise<apiPostResponse> {
	const { question, answer, answerType, lessonId } = postData;
	if (!question || !answer || !answerType || !lessonId) throw 'Missing data';
	const formData = new FormData();
	formData.append('question', question);
	formData.append('answer', answer);
	formData.append('answer_type', answerType);
	formData.append('lesson_id', lessonId.toString());

	const url = `http://${API_URL}/api/cards`;

	const requestOptions = {
		method: 'POST',
		body: formData,
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function updateCard(
	postData: cardUpdate
): Promise<apiPostResponse> {
	const { id, question, answer, answerType, lessonId } = postData;
	if (!id || !question || !answer || !answerType || !lessonId)
		throw 'Missing data';

	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/cards?${params}`;
	const bodyObject = {
		...postData,
		answer_type: answerType,
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

export async function deleteCard(id: number): Promise<apiPostResponse> {
	const params = new URLSearchParams({
		id: id.toString(),
	});

	const url = `http://${API_URL}/api/cards?${params}`;

	const requestOptions = {
		method: 'DELETE',
	};

	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
