import React, { useLayoutEffect } from 'react';

import './Detail.scss';

function Detail({ data }) {
	const { abstract, media, published_date, title, url } = data;

	useLayoutEffect(() => {
		// Scroll to top after mounting
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	return (
		<main className="detail">
			<img
				className="detail--image"
				src={media[0]['media-metadata'][4].url}
				alt={title}
			/>
			<h2 className="detail--title">{title}</h2>
			<h5>{published_date}</h5>
			<p>{abstract}</p>
			<a href={url} target="_blank" rel="noopener noreferrer">
				Read More
			</a>
		</main>
	);
}

export default Detail;
