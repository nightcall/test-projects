import React from 'react';
import io from 'socket.io-client';
import GameInfo from './GameInfo';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            isPlaying,
            isGameFull
        } = this.props.gameState;

        if(isGameFull) {
            return(
                <div id='above'>
                    <div className="jumbotron">
                        <h1 className="display-3">Game full !</h1>
                        <p className="lead">Try to refresh in a few moments..</p>
                    </div>
                </div>
            );
        }

        return null;
    }
}