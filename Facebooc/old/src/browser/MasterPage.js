import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import WrongPath from './WrongPath';
import LoginPage from './LoginPage';
import LoadingPage from './LoadingPage';

export default class MasterPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            isLoggedIn,
            hasAuth
        } = this.props;

        if(hasAuth) {
            if(isLoggedIn) {
                return(
                    <Switch>
                    <Route exact path='/' component={Home} />
                        <Route component={WrongPath} />
                    </Switch>
                );
            } else {
                return <LoginPage onLogin={this.props.onLogin} />
            }
        } else {
            return <LoadingPage />
        }
    }
};