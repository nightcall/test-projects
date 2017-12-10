import React from 'react';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({message: e.target.value});
    }

    handleClick() {
        if(this.state.message) {
            this.props.onSend(this.state.message);
            this.setState({message: ''});
        }
    }

    render() {
        return(
            <div id='chat-container'>
                <div id='chat-messages'>
                    <div>
                        {this.props.messages.map((m, i) => <p key={i} ><strong>{m.name}</strong> : {m.text}</p>)}
                    </div>
                    <div>
                        <h3>Clients connected :</h3>
                        {this.props.clients.map(c => <h5 key={c.id}>{c.name}</h5>)}
                    </div>
                </div>

                {this.props.isLoggedIn ? (
                    <div id='chat-input'>
                        <textarea onChange={this.handleChange} value={this.state.message} />
                        <button onClick={this.handleClick} >Send</button>
                    </div>
                ) : (
                    <div id='chat-input'>
                        <p>You must be logged in to chat !</p>
                    </div>
                )}
            </div>
        );
    }
}

export default Chat;