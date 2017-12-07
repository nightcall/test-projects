
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var pug = require('pug');
var path = require('path');

app.set('view-engine', 'pug');
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/../../public'));

app.get('/*', (req, res) => {
    res.render('layout.pug');
});

var id = 0;
var clients = [];

const dump = () => console.log(clients);

io.on('connection', socket => {
    socket.emit('update_clients_list', clients);

    /* Client wants to login */
    socket.on('login', username => {
        socket.clientId = id++;
        clients.push({id: socket.clientId, name: username});
        io.emit('update_clients_list', clients);
    });

    socket.on('message', m => {
        if(m.name && m.text)
            io.emit('message', m);
    });

    /* Clients quits */
    socket.on('disconnect', () => {
        clients.forEach((c, i) => {
            if(c.id == socket.clientId) {
                clients.splice(i, 1);
                io.emit('update_clients_list', clients);
            }
        });
    });
});


server.listen(8080);