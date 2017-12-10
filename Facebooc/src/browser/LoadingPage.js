import React from 'react';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id='loading'>
                <img src='/loading.svg' alt='loading...' />
            </div>
        );
    }
}