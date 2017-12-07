import React from 'react';
import io from 'socket.io-client';

import LoginBar from './LoginBar';
import Chat from './Chat';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.socket = io();
        this.state = {
            isLoggedIn: false,
            name: '',
            clientList: [],
            messages: []
        }

        this.login = this.login.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    login(name) {
        if(name) {
            this.setState({isLoggedIn: true, name: name});
            this.socket.emit('login', name);
        }
    }

    sendMessage(m) {
        if(m && this.state.name) {
            this.socket.emit('message', {name: this.state.name, text: m});
        }
    }

    componentDidMount() {
        this.socket.connect('http://localhost:8080');
        this.socket.on('update_clients_list', clients => {
            this.setState({clientList: clients});
        });

        this.socket.on('message', m => {
            this.setState(prevState => {
                let state = prevState;
                state.messages.push(m);

                return state;
            });
        });
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        return(
            <div id='container'>
                <LoginBar isLoggedIn={this.state.isLoggedIn} name={this.state.name} onSubmit={this.login} />
                <Chat isLoggedIn={this.state.isLoggedIn} name={this.state.name} clients={this.state.clientList} messages={this.state.messages} onSend={this.sendMessage} />
            </div>
        );
    }
}

export default App;