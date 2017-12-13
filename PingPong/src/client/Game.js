import React from 'react';
import io from 'socket.io-client';
import GameInfo, { GameState } from './GameInfo';

const Key = {
    up: 38,
    down: 40
};

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.socket = io();
        this.world = {
            ball: {
                x: 450,
                y: 250
            },
            side: '',
            bars: {
                'left': {
                    x: 50,
                    y: 150
                },
                'right': {
                    x: 830,
                    y: 150
                }
            }
        };

        this.state = {
            gameState: GameState.NotDefined,
            points: {
                left: 0,
                right: 0
            }
        };

        /* Mouse move event */
        this.handleKeyPressed = this.handleKeyPressed.bind(this);
        window.onkeydown = this.handleKeyPressed;

        this.setContext = this.setContext.bind(this);
    }

    handleKeyPressed(e) {
        if(this.state.gameState == GameState.Playing) {
            if(e.keyCode == Key.up) {
                this.socket.emit('BAR_MOVE', -1);
            } else if(e.keyCode == Key.down) {
                this.socket.emit('BAR_MOVE', 1);
            }
        }
    }

    setContext(r) {
        this.ctx = r.getContext('2d');
    }

    drawBall() {
        const ball = this.world.ball;

        this.ctx.beginPath();
        this.ctx.fillStyle = '#deaa67';
        this.ctx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawBars() {
        const {
            me,
            ennemy
        } = this.world.bars;

        for(let b in this.world.bars) {
            this.ctx.fillStyle = '#ecc088';
            this.ctx.fillRect(this.world.bars[b].x, this.world.bars[b].y, 20, 90);
            this.ctx.fillStyle = '#deaa67';
            this.ctx.fillRect(this.world.bars[b].x, this.world.bars[b].y+90, 20, 10);
        }
    }

    renderWorld() {
        this.ctx.clearRect(0, 0, 900, 500);
        this.drawBall();
        this.drawBars();
    }

    componentDidMount() {
        this.socket.connect('localhost:8080');

        this.socket.on('GAME_FULL', () => {
            this.setState({gameState: GameState.GameFull});
            this.socket.close();
        });

        this.socket.on('GAME_QUEUEING', () => {
            this.setState({gameState: GameState.Queueing});
        });

        this.socket.on('GAME_START', side => {
            this.world.side = side;
            this.renderWorld();

            this.setState({gameState: GameState.Playing});
            
            this.socket.on('GAME_DISCONNECT', () => {
                this.setState({gameState: GameState.Disconnect});
            });
            
            this.socket.on('BALL_MOVE', data => {
                this.world.ball.x = data.x;
                this.world.ball.y = data.y;
                this.renderWorld();
            });

            this.socket.on('BAR_MOVE', data => {
                this.world.bars[data.side].y = data.pos;
                this.renderWorld();
            });

            this.socket.on('POINTS', data => {
                this.setState(prevState => {
                    let state = prevState;
                    state.points[data.side] = data.points;

                    return state;
                });

                this.renderWorld();
            });
        });

        this.renderWorld();
    }

    componentWillUnmount() {
        this.socket.close();
    }

    render() {
        return(
            <div id='container'>
                <GameInfo gameState={this.state.gameState} />
                <div id="score">
                    <h1>{this.state.points.left}</h1>
                    <h1>{this.state.points.right}</h1>
                </div>
                <canvas width={900} height={500}
                    ref={this.setContext} />
            </div>
        );
    }
}