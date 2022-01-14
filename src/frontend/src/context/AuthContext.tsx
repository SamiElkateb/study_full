import React, { useEffect, useState } from 'react';
import { loginData, registerData } from '../types/api_interfaces';
import { loginAPI, registerAPI } from '../API/auth';

interface AuthContextInterface {
	authToken: string;
	isLoggedIn: boolean;
	login: (loginData: loginData) => void;
	register: (registerData: registerData) => void;
	logout: () => void;
}
const AuthContext = React.createContext<AuthContextInterface>({
	isLoggedIn: false,
	authToken: '',
	login: (loginData: loginData) => {},
	register: (registerData: registerData) => {},
	logout: () => {},
});

const AuthContextProvider: React.FC = (props) => {
	const { children } = props;
	const [authToken, setAuthToken] = useState('');
	useEffect(() => {
		const authToken = localStorage.getItem('session');
		authToken && setAuthToken(authToken);
	}, []);

	const isLoggedIn = authToken.trim().length > 1;

	const login = (loginData: loginData) => {
		loginAPI(loginData).then((response) => {
			if (!response.ok) return;
			localStorage.setItem('session', response.jwt);
			setAuthToken(response.jwt);
		});
	};
	const register = (registerData: registerData) => {
		registerAPI(registerData).then(login.bind(null, registerData));
	};
	const logout = () => {
		localStorage.removeItem('session');
		setAuthToken('');
	};
	const authContext = {
		isLoggedIn,
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
