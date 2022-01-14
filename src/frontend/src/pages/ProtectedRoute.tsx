import { ReactNode, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
	let auth = useContext(AuthContext);
	let location = useLocation();

	if (!auth.isLoggedIn) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};
export default ProtectedRoute;
