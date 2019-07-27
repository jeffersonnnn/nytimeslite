import React, { useContext, useState } from 'react';

import { DataContext } from '..';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import Detail from '../Detail/Detail';

import './Content.scss';

const CalendarIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="15"
		height="15"
		viewBox="0 0 25 25"
	>
		<path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
		<path fill="none" d="M0 0h24v24H0z" />
	</svg>
);

const ChevronRightIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
		<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
);

function Content() {
	const [selected, setSelected] = useState({});

	const { data, error } = useContext(DataContext);

	const isSelected = Object.keys(selected).length;

	const contentBody = data.map(item => {
		const { id, byline, media, title, published_date } = item;

		return (
			<div className="content--item" key={id} onClick={() => setSelected(item)}>
				<div className="content--image">
					<img alt="thumbnail" src={media[0]['media-metadata'][1].url} />
				</div>
				<div className="content--body">
					<div className="content--body-title">{title}</div>
					<div className="content--footer">
						<div className="content--footer-byline">{byline}</div>
						<div className="content--footer-date">
							<CalendarIcon />
							{published_date}
						</div>
					</div>
				</div>
				<div className="content--item-right">
					<ChevronRightIcon />
				</div>
			</div>
		);
	});

	return (
		<main className="content">
			{error ? (
				<Error error={error} />
			) : isSelected ? (
				<Detail data={selected} />
			) : data.length > 0 ? (
				contentBody
			) : (
				<Loading />
			)}
		</main>
	);
}

export default Content;
