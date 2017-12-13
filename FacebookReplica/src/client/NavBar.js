import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
	return <Link to='/'><img src='/logo.svg' /></Link>;
};

const Notifications = () => {
	return <p>Notifications (todo)</p>;
};

export default class NavBar extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			isLoggedIn,
			username
		} = this.props;

		return(
			<nav>
				<div id='nav-container' className='container_1024'>
					<div id='nav-left'>
						<Logo />
					</div>
					<div id='nav-right'>
						<h3><Link to={`/${username}`} >{username}</Link></h3>
						<Notifications />
						<p>Logout</p>
					</div>
				</div>
			</nav>
		);
	}
};