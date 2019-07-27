import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Detail from './Detail';

describe('Detail', () => {
	let spy;

	afterEach(cleanup);

	beforeAll(() => {
		spy = jest
			.spyOn(window, 'scrollTo')
			.mockImplementation(() => (window.scrollY = 0));
	});

	afterAll(() => {
		spy.mockClear();
	});

	const data = {
		abstract: 'an abstract',
		media: [
			{
				'media-metadata': [
					{},
					{},
					{},
					{},
					{
						url: 'https://imgplaceholder.com'
					}
				]
			}
		],
		published_date: '2019-24-1',
		title: 'a title',
		url: 'https://url.com'
	};

	it('should call scrollTo event once', () => {
		render(<Detail data={data} />);

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should render properly with given data', () => {
		const { container } = render(<Detail data={data} />);

		expect(container.querySelector('.detail .detail--title').textContent).toBe(
			'a title'
		);
	});
});
