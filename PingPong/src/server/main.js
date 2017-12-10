
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
    constructor() {
        this.reset();
    }

    hasWon() {
        return this.points > 5;
    }

    reset() {
        this.point = 0;
        this.barPos = 0;
    }
}

class Game {
    constructor() {
        this.reset();
        this.step = this.step.bind(this);
    }

    reset() {
        this.players = [];
        this.isGameOver = false;
        this.ballPos = {x: 0, y: 0};
    }

    readyToStart() {
        return this.players.length == 2;
    }

    step() {

    }
}

let game = new Game;

/*** SOCKETS ***/
io.on('connection', socket => {
    console.log(info('A player connected :D'));

    socket.on('disconnect', () => {
        console.log(warning('A player left :('));
    });

    if(game.players.length >= 0) {
        socket.emit('GAME_FULL');
        return;
    }
});

server.listen(8080);

console.log(chalk.bgBlue.white('Server started on port 8080.'));