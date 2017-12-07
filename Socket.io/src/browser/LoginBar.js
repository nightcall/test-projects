import React from 'react';

class LoginBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pendingName: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.pendingName) {
            this.props.onSubmit(this.state.pendingName);
        }
    }

    handleChange(e) {
        this.setState({pendingName: e.target.value});
    }

    render() {
        if(this.props.isLoggedIn) {
            return(
                <div id='login-bar'>
                    <h3>Logged as <span className='italic'>{this.props.name}</span></h3>
                    <h3>My super chat ;*</h3>
                </div>
            );
        } else {
            return(
                <div id='login-bar'>
                    <form onSubmit={this.handleSubmit} >
                        <input onChange={this.handleChange} />
                        <button>
                            Log in !
                        </button>
                        </form>
                    <h3>My super chat ;*</h3>
                </div>
            );
        }
    }
}

export default LoginBar;