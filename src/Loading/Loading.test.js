import React from 'react';
import { act, cleanup, render } from 'react-testing-library';
import Loading from './Loading';

describe('NotFound', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
		cleanup();
	});

	it('should have the loading text', () => {
		const { container } = render(<Loading />);

		expect(container.textContent).toBe('Loading.');
	});

	it('should increment dots on loading text', () => {
		const { container } = render(<Loading />);

		expect(container.textContent).toBe('Loading.');

		act(() => jest.advanceTimersByTime(1000));
		expect(container.textContent).toBe('Loading..');

		act(() => jest.advanceTimersByTime(1000));

		expect(container.textContent).toBe('Loading...');

		// Go back to the initial loading state after the third dot
		act(() => jest.advanceTimersByTime(1000));
		expect(container.textContent).toBe('Loading.');
	});
});
