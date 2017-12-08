import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import WrongPath from './WrongPath';
import LoginPage from './LoginPage';
import LoadingPage from './LoadingPage';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            hasAuth: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    auth() {
        return fetch('/auth', {
            method: 'post',
            credentials: 'same-origin'
        })
        .then(data => data.json())
        .then(auth => auth.logged);
    }

    login(username, password) {
        return fetch('/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            credentials: 'same-origin',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(data => data.json())
        .then(auth => auth.logged);
    }

    logout() {
        return fetch('/logout', {
            method: 'post',
            credentials: 'same-origin'
        });
    }

    componentWillMount() {

        /* Try to auth the first time */
        this.auth().then(isLoggedIn => this.setState({
            isLoggedIn: isLoggedIn,
            hasAuth: true
        }));
    }

    handleLogin(username, password) {
        this.login(username, password).then(isLoggedIn => {
            this.setState({isLoggedIn: isLoggedIn});
        });
    }

    handleLogout(username, password) {
        this.logout().then(isLoggedIn => {
            this.setState({isLoggedIn: isLoggedIn});
        });
    }

    render() {
        const { 
            isLoggedIn,
            hasAuth
        } = this.state;

        return(
            static banner component handlelogout={}
            if auth
                if log
                    switch principal
                else
                    logpage
        );

        if(hasAuth) {
            if(isLoggedIn) {
                return(
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route component={WrongPath} />
                    </Switch>
                );
            } else {
                return <LoginPage onLogin={this.handleLogin} />
            }
        } else {
            return <LoadingPage />;
        }
    }
};