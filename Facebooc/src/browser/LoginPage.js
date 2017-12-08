import React from 'react';
import staticBanner from './StaticBanner';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pendingUsername: '',
            pendingPassword: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({pendingUsername: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({pendingPassword: event.target.value});
    }

    render() {
        return(
            <div id='container'>
                {staticBanner()}
                <div id='login'>
                    <form>
                        <input placeholder='Username'
                                onChange={this.handleUsernameChange} />
                        <input placeholder='Password'
                                onChange={this.handlePasswordChange} />
                        <button>Log in</button>
                    </form>
                </div>
            </div>
        );
    }
}