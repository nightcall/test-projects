import React from 'react';

import MasterPage from './MasterPage';
import Banner from './Banner';

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
        })
        .then(data => data.json())
        .then(auth => auth.logged);
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

    handleLogout() {
        this.logout().then(isLoggedIn => {
            console.log(isLoggedIn);
            this.setState({isLoggedIn: isLoggedIn});
        });
    }

    render() {
        return(
            <div id='container'>
                <Banner onLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} />
                <MasterPage isLoggedIn={this.state.isLoggedIn}
                    hasAuth={this.state.hasAuth}
                    onLogin={this.handleLogin} />
            </div>
        );
    }
};