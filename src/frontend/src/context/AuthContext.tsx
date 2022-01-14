import React, { useEffect, useState } from 'react';
import { loginData, registerData } from '../types/api_interfaces';
import { loginAPI, registerAPI } from '../API/auth';

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
		const token = localStorage.getItem('session');
		const id = localStorage.getItem('user_id');
		token && setAuthToken(token);
		id && setUserId(+id);
	}, []);

	const isLoggedIn = Boolean(authToken);

	const login = (loginData: loginData) => {
		loginAPI(loginData).then((response) => {
			if (!response.ok) return;
			localStorage.setItem('session', response.jwt);
			localStorage.setItem('user_id', response.id.toString());
			setUserId(response.id);
			setAuthToken(response.jwt);
		});
	};
	const register = (registerData: registerData) => {
		registerAPI(registerData).then(login.bind(null, registerData));
	};
	const logout = () => {
		localStorage.removeItem('session');
		localStorage.removeItem('user_id');
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
