import React from 'react';
import staticBanner from './StaticBanner';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id='container'>
                {staticBanner()}
                <div id='home'>
                    <h1>Home</h1>
                </div>
            </div>
        );
    }
}