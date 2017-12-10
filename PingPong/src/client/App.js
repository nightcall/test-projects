import React from 'react';
import io from 'socket.io-client';
import GameInfo from './GameInfo';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.socket = io();

        this.state = {
            isPlaying: false,
            isGameFull: false
        }

        /* Mouse move event */
        this.handleMouseMove = this.handleMouseMove.bind(this);
        window.onmousemove = this.handleMouseMove;
    }

    handleMouseMove() {
        
    }

    handleClick() {
        this.setState({isPlaying: true});
    }

    componentDidMount() {
        this.ctx.fillRect(50,50, 20, 100);
        this.socket.connect('localhost:8080');

        this.socket.on('GAME_START', () => {

        });
        /*
        this.socket.on('GAME_FULL', () => {
            console.log('aaaa');
            this.setState({isGameFull: true});
        });*/
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        return(
            <div id='container'>
                {/*<GameInfo gameState={this.state} />*/}
                <canvas width={900} height={500}
                    ref={r => this.ctx = r.getContext('2d')}
                    onClick={() => this.handleClick()} />
            </div>
        );
    }
}