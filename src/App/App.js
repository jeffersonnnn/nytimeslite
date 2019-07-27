import React from 'react';

import Content from '../Content/Content';
import './App.scss';

function App() {
	return (
		<div className="app">
			<header>
				<span className="logo" onClick={() => (window.location = '')}>
					Nytimes Lite
				</span>
			</header>

			<Content />
			<footer>Nytimes Lite, Copyright &copy;2019</footer>
		</div>
	);
}

export default App;
