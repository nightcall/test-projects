import React from 'react';

export const GameState = {
    NotDefined:     0,
    Queueing:       1,
    GameFull:       2,
    Playing:        3,
    EndScreen:      4,
    Disconnect:     5
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            gameState
        } = this.props;

        switch(gameState) {
            case GameState.NotDefined:
                return(
                    <div id='above' style={{opacity: 1}} >
                    </div>
                );
                break;

            case GameState.GameFull:
                return(
                    <div id='above'>
                        <div className="jumbotron">
                            <h1 className="display-3">Game full !</h1>
                            <p className="lead">Try to refresh in a few moments..</p>
                        </div>
                    </div>
                );
                break;

            case GameState.Queueing:
                return(
                    <div id='above'>
                        <div className="jumbotron">
                            <h1 className="display-3">Waiting for player 2</h1>
                            <p className="lead">Waiting for player 2 to join..</p>
                        </div>
                    </div>
                );
                break;

            case GameState.Disconnect:
                return(
                    <div id='above'>
                        <div className="jumbotron">
                            <h1 className="display-3">Player 2 disconnected !</h1>
                            <p className="lead">Refresh to play another game</p>
                        </div>
                    </div>
                );
                break;

            case GameState.Playing:
                return null;
                break;

        }

        return null;
    }
}