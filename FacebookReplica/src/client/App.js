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

    handleLogout = () => {
        fetch('/logout', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin'
        })
        .then(() => {
            this.setState({
                isLoggedIn: false,
                username: ''
            });
        })
        .catch(err => console.log('failed to logout'));
    }

    handleLogin = (username, password) => {
        fetch('/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(data => data.json())
        .then(res => {
            this.setState({
                isLoggedIn: true,
                username: res.username
            });
        })
        .catch(err => console.log('pas connecte :('));
    }

    render() {
        const {
            isLoggedIn
        } = this.state;

        return(
            <Layout {...this.state}
                onLogin={this.handleLogin}
                onLogout={this.handleLogout} >
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