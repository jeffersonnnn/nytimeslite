import React from 'react';
import './Error.scss';

function Error({ error }) {
	return <div className="error">{error ? error : `Error Occurred ;(`}</div>;
}

export default Error;
