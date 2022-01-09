/** @format */

import { render, screen, cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import Card from '../Card';

describe('Card Component', () => {
	afterEach(cleanup);
	it('uses the props className', () => {
		render(<Card className={'test-card'} />);

		const CardElement = screen.getByTestId('Card');

		expect(CardElement.classList.contains('test-card')).toBe(true);
	});

	it('renders children', () => {
		const children = <div data-testid={'children-rendered'}></div>;

		render(<Card>{children}</Card>);

		const CardChildren = screen.getByTestId('children-rendered');

		expect(CardChildren).toBeInTheDocument();
	});

	it('matches card snapshot', () => {
		const tree = TestRenderer.create(
			<Card className={'test-card'}>
				<div data-testid={'children-rendered'}></div>
			</Card>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
