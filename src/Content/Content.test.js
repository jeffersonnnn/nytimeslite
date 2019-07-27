import React from 'react';
import { act, cleanup, fireEvent, render } from 'react-testing-library';

import Content from './Content';
import { DataContext } from '..';

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
					},
					{},
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
					},
					{},
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

describe('Content', () => {
	let spy;

	beforeAll(() => {
		spy = jest
			.spyOn(window, 'scrollTo')
			.mockImplementation(() => (window.scrollY = 0));
	});

	afterEach(cleanup);

	it('should render error if exists', () => {
		const { container } = render(
			<DataContext.Provider value={{ data, error: 'error occured' }}>
				<Content />
			</DataContext.Provider>
		);

		expect(container.querySelector('.error').textContent).toBe('error occured');
	});

	describe('OnClick', () => {
		let container;

		beforeEach(() => {
			({ container } = render(
				<DataContext.Provider value={{ data, error: '' }}>
					<Content />
				</DataContext.Provider>
			));
		});

		afterEach(cleanup);

		it('should set first item selected on click', () => {
			const contentItems = container.querySelectorAll('.content--item');
			fireEvent.click(contentItems[0]);
			expect(
				container.querySelector('.detail .detail--title').textContent
			).toBe('a title');
		});

		it('should set second item selected on click', () => {
			const contentItems = container.querySelectorAll('.content--item');
			fireEvent.click(contentItems[1]);
			expect(
				container.querySelector('.detail .detail--title').textContent
			).toBe('a title 2');
		});
	});
});
