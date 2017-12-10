import React from 'react';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.inputRef.focus();
    }

    handleSubmit(event) {
        event.preventDefault();

        const {
            username,
            password
        } = this.state;

        if(username && password) {

            /* LOG IN EVENT */
            this.props.onLogin(username, password);
        }
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return(
            <div id='login'>
                <form onSubmit={this.handleSubmit} >
                    <input placeholder='Username'
                            onChange={this.handleUsernameChange}
                            ref={input => this.inputRef = input} />
                    <input placeholder='Password'
                            onChange={this.handlePasswordChange} />
                    <button>Log in</button>
                </form>
            </div>
        );
    }
}