import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
	return <Link to='/'><img src='/logo.svg' /></Link>;
};

const Notifications = () => {
	return <p>Notifications (todo)</p>;
};

const SearchBar = () => {
	return(
		<form className='input-group'
			onSubmit={e => e.preventDefault()} >
			<input placeholder='Search...'
				className='form-control' />
			<span className="input-group-btn">
		    	<input type='submit' className='btn btn-secondary' value='Search' />
		    </span>
		</form>
	);
};

export default class NavBar extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			searchValue: '',
			usernameValue: '',
			passwordValue: ''
		};
	}

	handleLogin = (event) => {
		event.preventDefault();

		const {
			usernameValue,
			passwordValue
		} = this.state;

		if(!usernameValue
		|| !passwordValue)
			return;

		fetch('/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin',
            body
		})
		.then(data => data.json())
		.then(posts => {
			this.setState(prevState => ({
				posts: [...prevState.posts, ...posts]
			}));
		});
	}

	handleUsernameChange = (event) => {
		this.setState({usernameValue: event.target.value});
	}

	handlePasswordChange = (event) => {
		this.setState({passwordValue: event.target.value});
	}

	render() {
		const {
			isLoggedIn,
			username
		} = this.props;

		return(
			<nav>
				<div id="nav-full-container">
					<div id='nav-container' className='container_1024'>
						<div id='nav-left'>
							<Logo />
							{isLoggedIn ? <SearchBar /> : null}
						</div>
						<div id='nav-right'>
							{isLoggedIn ? (
								<React.Fragment>
									<h3><Link to={`/${username}`} >{username}</Link></h3>
									<Notifications />
									<p>Logout</p>
								</React.Fragment>
							) : (
								<form onSubmit={this.handleLogin} >
									<input placeholder='Username'
										value={this.state.usernameValue}
										onChange={this.handleUsernameChange} />
									<input placeholder='Password'
										value={this.state.passwordValue}
										type='password'
										onChange={this.handlePasswordChange} />
									<input type='submit' value='Log in' />
								</form>
							)}
						</div>
					</div>
				</div>
			</nav>
		);
	}
};