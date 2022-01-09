import { Routes, Route } from 'react-router-dom';
import Footer from './components/Navbars/Footer/Footer';
import Header from './components/Navbars/Header/Header';
import Theme from './components/UI/Theme/Theme';
import Home from './pages/Home/Home';
import Study from './pages/Study/Study';

function App() {
	return (
		<Theme>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="study" element={<Study />} />
				<Route path="about" element={<h1>about</h1>} />
			</Routes>
			<Footer />
		</Theme>
	);
}

export default App;
