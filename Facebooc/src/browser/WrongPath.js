import React from 'react';
import staticBanner from './StaticBanner';

export default class WrongPath extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id='container'>
                {staticBanner()}
                <h1>404 Not found</h1>
            </div>
        );
    }
}