import { API_URL } from '../constants/Url';
import {
	apiPostResponse,
	apiResponse,
	loginData,
	loginResponse,
	registerData,
} from '../types/api_interfaces';

export async function registerAPI(
	postData: registerData
): Promise<apiPostResponse> {
	const { email, password } = postData;
	if (!email || !password) throw 'Missing data';
	const formData = new FormData();
	formData.append('email', email);
	formData.append('password', password);

	const url = `http://${API_URL}/users/register`;

	const requestOptions = {
		method: 'POST',
		body: formData,
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}

export async function loginAPI(postData: loginData): Promise<loginResponse> {
	const { email, password } = postData;
	if (!email || !password) throw 'Missing data';
	const formData = new FormData();
	formData.append('email', email);
	formData.append('password', password);
	const url = `http://${API_URL}/users/login`;

	const requestOptions = {
		method: 'POST',
		body: formData,
	};
	return fetch(url, requestOptions)
		.then((response) => response.json())
		.catch((error) => console.log(error));
}
