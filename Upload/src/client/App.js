import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Nav from './Nav';
import Post from './Post';
import './App.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id='container'>
                <Nav />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/:id' component={Post} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}