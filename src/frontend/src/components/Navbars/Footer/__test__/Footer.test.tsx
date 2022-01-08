import { render, screen, cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import Footer from '../Footer';
import { BrowserRouter } from 'react-router-dom';

describe('Footer Component', () => {
	afterEach(cleanup);
	it('renders', () => {
		render(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		);

		const FooterElement = screen.getByTestId('Footer');

		expect(FooterElement).toBeInTheDocument();
	});

	it('matches footer snapshot', () => {
		const tree = TestRenderer.create(
			<BrowserRouter>
				<Footer />
			</BrowserRouter>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
