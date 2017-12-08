import React from 'react';
import { Link } from 'react-router-dom';

export default class Banner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isLoggedIn } = this.props;

        return(
            <div id='banner'>
                <h1><Link to='/'>Facebooc</Link></h1>
                {isLoggedIn ? <h3><Link to ='/' onClick={this.props.onLogout} >Log out</Link></h3> : null}
            </div>
        );
    }
}