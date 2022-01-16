import React, { useEffect, useState } from 'react';
import { loginData, registerData } from '../types/api_interfaces';
import { loginAPI, registerAPI } from '../API/auth';
import UserManager from '../database/UserManager';
import updateDatabase from '../helpers/updateDatabase';

interface AuthContextInterface {
	authToken?: string;
	isLoggedIn: boolean;
	userId?: number;
	login: (loginData: loginData) => void;
	register: (registerData: registerData) => void;
	logout: () => void;
}
const AuthContext = React.createContext<AuthContextInterface>({
	isLoggedIn: false,
	userId: undefined,
	authToken: undefined,
	login: (loginData: loginData) => {},
	register: (registerData: registerData) => {},
	logout: () => {},
});

const AuthContextProvider: React.FC = (props) => {
	const { children } = props;
	const [authToken, setAuthToken] = useState<string>();
	const [userId, setUserId] = useState<number>();
	useEffect(() => {
		const userManager = new UserManager();
		userManager.get().then((data) => {
			if (data.length === 0) return;
			const { token, id } = data[0];
			token && setAuthToken(token);
			id && setUserId(+id);
		});
	}, []);

	const isLoggedIn = Boolean(authToken);

	const login = async (loginData: loginData) => {
		const response = await loginAPI(loginData);
		if (!response.ok) return;
		const { id, jwt: token } = response;
		const userManager = new UserManager();
		await userManager.add({ id, token });
		await updateDatabase();
		setUserId(response.id);
		setAuthToken(response.jwt);
	};

	const register = (registerData: registerData) => {
		registerAPI(registerData).then(login.bind(null, registerData));
	};

	const logout = () => {
		const userManager = new UserManager();
		userManager.delete();
		setUserId(undefined);
		setAuthToken(undefined);
	};
	const authContext = {
		isLoggedIn,
		userId,
		authToken,
		login,
		register,
		logout,
	};

	return (
		<AuthContext.Provider value={authContext}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
export { AuthContext, AuthContextProvider };
