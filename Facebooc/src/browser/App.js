import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import WrongPath from './WrongPath';
import LoginPage from './LoginPage';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };
    }

    render() {
        if(this.state.isLoggedIn) {
            return(
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route component={WrongPath} />
                </Switch>
            );
        } else {
            return <LoginPage onLogin={this.handleLogin} />
        }
    }
};