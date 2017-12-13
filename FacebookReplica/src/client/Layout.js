import React from 'react';
import NavBar from './NavBar';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id='app-container'>
                <NavBar {...this.props} />
                {this.props.children}
            </div>
        );
    }
}