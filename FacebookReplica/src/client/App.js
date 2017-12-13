import React from 'react';
import T from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import DefaultPage from './DefaultPage';
import ProfilePage from './ProfilePage';

export default class App extends React.Component {
	static defaultProps = {
		isLoggedIn: false,
		username: ''
	};

	static propTypes = {
		isLoggedIn: T.bool.isRequired,
		username: T.string
	};

	constructor(props) {
		super(props);

		this.state = {
			...this.props
		};
	}

	render() {
		const {
			isLoggedIn
		} = this.state;

		return(
			<Layout {...this.state} >
				{isLoggedIn ? (
					<Switch>
						{/* unique timestamp prop is for always re-rendering the component */}
						<Route exact path='/' component={(props) => (
							<HomePage timestamp={Date.now()} {...props} />)} />
						<Route exact path='/:username' component={(props) => (
							<ProfilePage timestamp={Date.now()} {...props} />)} />
						<Route component={DefaultPage} />
					</Switch>	
				) : (
					<LoginPage />
				)}
			</Layout>
		);
	}
}