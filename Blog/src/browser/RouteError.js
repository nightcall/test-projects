import React from 'react';
import { Link } from 'react-router-dom';

class RouteError extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<h1>Error page note found :(</h1>
				<Link to='/'>Back to home page</Link>
			</div>
		);
	}
}

export default RouteError;