import React, { createContext, useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import isEqual from 'lodash.isequal';
import 'isomorphic-fetch';

import './index.scss';
import Loading from './Loading/Loading';

const App = React.lazy(() => import('./App/App'));
const NotFound = React.lazy(() => import('./NotFound/NotFound'));

export const API_URL =
	'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=qrPJatGEbiTG4EwoiPYefSN6TQ2u7OOv';

export const DataContext = createContext({ data: [], error: '' });

const DataProvider = ({ children }) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState('');

	const fetchInitData = async () => {
		try {
			const res = await fetch(API_URL);
			const data = await res.json();

			if (data.fault) {
				// error = 'Rate limit Exceeded';
				setError('Rate limit Exceeded');
			} else {
				// results = data.results;
				setData(data.results);
			}
		} catch (e) {
			setError(e.message);
		}
	};

	useEffect(() => {
		fetchInitData();
	}, [isEqual(data)]);

	return (
		<DataContext.Provider value={{ data, error }}>
			{children}
		</DataContext.Provider>
	);
};

function Routes() {
	return (
		<Suspense fallback={<Loading />}>
			<DataProvider>
				<Router>
					<App path="/" />
					<NotFound default />
				</Router>
			</DataProvider>
		</Suspense>
	);
}

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(<Routes />, document.getElementById('root'));
});
