import React from 'react';
import { cleanup, render } from 'react-testing-library';
import Error from './Error';

describe('Error', () => {
	afterEach(() => {
		cleanup();
	});

	it('should have right Error text', () => {
		const { container } = render(<Error />);

		expect(container.querySelector('.error').textContent).toBe(
			'Error Occurred ;('
		);
	});

	it('should display the error text by prop', () => {
		const { container } = render(<Error error="some error occured" />);

		expect(container.querySelector('.error').textContent).toBe(
			'some error occured'
		);
	});
});
