import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RouteError from './RouteError';
import PostList from './PostList';
import Post from './Post';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<Switch>
				<Route exact path='/' component={PostList} />
				<Route exact path='/post/:postId' component={Post} />
				<Route component={RouteError} />
			</Switch>
		);
	}
}

export default App;