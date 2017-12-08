import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import WrongPath from './WrongPath';
import LoginPage from './LoginPage';
import LoadingPage from './LoadingPage';
import Banner from './Banner';

export default class MasterPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { 
            isLoggedIn,
            hasAuth,
            onLogin,
            onLogout
        } = this.props;


        if(hasAuth) {
            if(isLoggedIn) {
                return (
                    <div id='container'>
                        <Banner onLogout={onLogout} isLoggedIn={isLoggedIn} />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route component={WrongPath} />
                        </Switch>
                    </div>
                );
            } else {
                return (
                    <div id='container'>
                        <Banner onLogout={onLogout} isLoggedIn={isLoggedIn} />
                        <LoginPage onLogin={onLogin} />
                    </div>
                );
            }
        } else {
            return (
                <div id='container'>
                    <Banner onLogout={onLogout} isLoggedIn={isLoggedIn} />
                    <LoadingPage />
                </div>
            );
        }
    }
};