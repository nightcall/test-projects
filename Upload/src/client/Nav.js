import React from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <nav>
                <img src='/react.svg' />
                <h1><Link to='/'>Dropito</Link></h1>
            </nav>
        );
    }
}