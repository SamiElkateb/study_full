import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Footer from './components/Navbars/Footer/Footer';
import Header from './components/Navbars/Header/Header';
import Theme from './components/UI/Theme/Theme';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/User/Login/Login';
import Register from './pages/User/Register/Register';
import { ReactNode, useContext } from 'react';
import AuthContext from './context/AuthContext';

function App() {
	return (
		<Theme>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="study"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				>
					<Route
						path=":section"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
				</Route>

				<Route
					path="study/manage-cards"
					element={
						<PrivateRoute>
							<Dashboard manageCards={true} />
						</PrivateRoute>
					}
				>
					<Route
						path=":lesson_id"
						element={
							<PrivateRoute>
								<Dashboard manageCards={true} />
							</PrivateRoute>
						}
					/>
				</Route>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>

				<Route path="about" element={<h1>about</h1>} />
			</Routes>
			{/* <Footer /> */}
		</Theme>
	);
}

export default App;

const PrivateRoute: React.FC = (props) => {
	const { children } = props;
	let auth = useContext(AuthContext);
	let location = useLocation();

	if (!auth.isLoggedIn) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

const PublicRoute: React.FC = (props) => {
	const { children } = props;
	let auth = useContext(AuthContext);
	let location = useLocation();

	if (auth.isLoggedIn) {
		return <Navigate to="/study" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};
