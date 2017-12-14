import React from 'react';
import NavBar from './NavBar';
import ChatComponent from './ChatComponent';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id='app-container'>
                <NavBar {...this.props} />
                <div id='page-container'>
                    {this.props.children}
                </div>
                <ChatComponent />
            </div>
        );
    }
}