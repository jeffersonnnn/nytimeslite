import React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';

import App from './App';
import { DataContext } from '..';

describe('App', () => {
	afterEach(cleanup);

	const data = [
		{
			id: 123,
			byline: 'by NewYork Times',
			media: [
				{
					'media-metadata': [
						{},
						{
							url: 'https://imgplaceholder.com'
						}
					]
				}
			],
			published_date: '2019-24-1',
			title: 'a title'
		},
		{
			id: 124,
			byline: 'by NewYork Times',
			media: [
				{
					'media-metadata': [
						{},
						{
							url: 'https://imgplaceholder.com'
						}
					]
				}
			],
			published_date: '2019-24-1',
			title: 'a title 2'
		}
	];

	it('should render the right amount of content', () => {
		const { container } = render(
			<DataContext.Provider value={{ data, error: '' }}>
				<App />
			</DataContext.Provider>
		);
		const content = container.querySelector('.content');
		expect(content.querySelectorAll('.content--item').length).toBe(2);
	});

	it('should clear selected on click', () => {
		const { container, getByText } = render(<App />);

		fireEvent.click(getByText('Nytimes Lite'));

		expect(container.querySelector('.content').textContent).toBe('Loading.');
	});
});
