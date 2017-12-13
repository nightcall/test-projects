
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const fs = require('fs');

/*** Chalk config ***/
const chalk = require('chalk');
const info = chalk.bgGreen.white.bold;
const warning = chalk.bgRed.white.bold;

/*** HTTP ***/
app.use(express.static(__dirname + '/../../public'));
app.get('*', (req, res) => {
    res.redirect('/index.html');
});

/*** GAME DATA ***/
class Player {
    constructor(socket) {
        this.id = Player.counter++;
        this.socket = socket;
        this.points = 0;
        this.barPos = 150;
        this.side = ''
    }
}

class Game {
    constructor() {
        this.players = [];
        this.isGameOver = false;
        this.ball = {
            pos: {
                x: 450,
                y: 300
            },
            speed: {
                x: 300, 
                y: 120
            }
        };
    }

    sendPlayers(name, data) {
        for(let p of this.players) {
            p.socket.emit(name, data);
        }
    }

    readyToPlay() {
        return this.players.length == 2;
    }

    start() {
        this.lastStepTime = new Date().getTime();
    }

    remainingSide() {
        if(this.players.length)
            return this.players[0].side == 'left' ? 'right' : 'left';
        else
            return 'left';
    }

    /**** TODO **************************/
    step() {
        const elapsedTime = (new Date().getTime() - this.lastStepTime) / 1000;
        this.lastStepTime = new Date().getTime();

        const nextPos = this.ball.pos;
        nextPos.x += this.ball.speed.x * elapsedTime;
        nextPos.y += this.ball.speed.y * elapsedTime;

        if(this.players.length && nextPos.x > 910) {
            this.players.find(p => p.side == 'left').points++;
            this.sendPlayers('POINTS', {side: 'left',
                points: this.players.find(p => p.side == 'left').points});
            this.ball = {
                pos: {
                    x: 450,
                    y: 300
                },
                speed: {
                    x: 300, 
                    y: 120
                }
            };
        } else if(this.players.length && nextPos.x < 10) {
            this.players.find(p => p.side == 'right').points++;
            this.sendPlayers('POINTS', {side: 'right',
                points: this.players.find(p => p.side == 'right').points});
            this.ball = {
                pos: {
                    x: 450,
                    y: 300
                },
                speed: {
                    x: 300, 
                    y: 120
                }
            };
        }

        if(nextPos.y + 10 > 500) {
            nextPos.y = 490;
            this.ball.speed.y = -this.ball.speed.y;
        } else if(nextPos.y -10 < 0) {
            nextPos.y = 10;
            this.ball.speed.y = -this.ball.speed.y;
        }

        // collision with bars
        for(let player of this.players) {
            if(player.side =='left') {
                if(this.ball.speed.x < 0) {
                    if(nextPos.x - 10 < 70
                    && nextPos.y >= player.barPos
                    && nextPos.y < player.barPos + 100) {
                        this.ball.speed.y = -(this.ball.pos.y - (player.barPos + 50));
                        this.ball.speed.x = -this.ball.speed.x;
                    }
                }
            } else {
                if(this.ball.speed.x > 0) {
                    if(nextPos.x + 10 > 830
                    && nextPos.y >= player.barPos
                    && nextPos.y < player.barPos + 100)
                        this.ball.speed.x = -this.ball.speed.x;
                        this.ball.speed.y = -(this.ball.pos.y - (player.barPos + 50));
                }
            }
        }

        this.sendPlayers('BALL_MOVE', nextPos);
    }
}

Player.counter = 0;

let game = new Game;

/*** SOCKETS ***/
io.on('connection', socket => {

    if(game.players.length >= 2) {
        socket.emit('GAME_FULL');
        return;
    }
    
    // Create new player
    const player = new Player(socket);
    player.side = game.remainingSide();
    game.players.push(player);

    socket.on('disconnect', () => {
        game.players.splice(game.players.findIndex(p => p.id == player.id), 1);
        game.sendPlayers('GAME_DISCONNECT');
    });

    if(game.readyToPlay()) {
        // Send sides
        game.players[0].socket.emit('GAME_START', game.players[0].side);
        game.players[1].socket.emit('GAME_START', game.players[1].side);

        game.start();
        setInterval(game.step.bind(game), 10);
        socket.on('BAR_MOVE', c => {
            if(c < 0)
                player.barPos = player.barPos - 10 < 0 ? 0 : player.barPos - 10;
            else
                player.barPos = player.barPos + 110 > 500 ? 400 : player.barPos + 10;

            io.emit('BAR_MOVE', {side: player.side,
                pos: player.barPos});
        });
    } else {
        socket.emit('GAME_QUEUEING');
    }

});

server.listen(8888);

console.log(chalk.bgBlue.white('Server started on port 8888.'));