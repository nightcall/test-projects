import React from 'react';
import staticBanner from './StaticBanner';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id='container'>
                {staticBanner()}
                <div id='loading'>
                   <img src='/loading.svg' alt='loading...' />
                </div>
            </div>
        );
    }
}