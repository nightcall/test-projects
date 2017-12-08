const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const pug = require('pug');
const app = express();

/*** USER DATABASE ***/
const Database = require('./Database.js');
let db = new Database;

db.addUser({username: 'jon', password: '1234'});
db.addUser({username: 'sara', password: '1234'});
db.addUser({username: 'clementine', password: '1234'});

// db.addPost('jon', 'Hey feelin gr8 today :) and u ?');
// db.addPost('sara', 'YEAAAAAAAAAAAAH !!!!!! (L)');
// db.addPost('jon', 'A fond les ballons wesh');
// db.addComment(2, 'sara', 'vazy mais ferme ta gueule aussi');
// db.addComment(2, 'jon', 'jalouse ?');
// db.addComment(2, 'sara', 'ke dalle t un boloss c tou');


/*** SET UP ***/
app.set('view-engine', 'pug');
app.set('views', __dirname + '/views');
app.disable('x-powered-by');

/*** MIDDLEWARES ***/
app.use(express.static(__dirname + '/../../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
    extended: true
}));

/*** SESSION ***/
app.use(session({
    secret: '5Er4tz3fS8tY',
    resave: false,
    saveUninitialized: false
}));

/* LOGIN */
app.post('/login', (req, res) => {
    let log = {
        logged: false,
        username: 'Error'
    };

    const {
        username,
        password
    } = req.body;

    if(username && password) {
        const user = db.users.find(u => u.username == username
            && u.password == password);

        if(user != undefined) {
            log.logged = true;
            log.username = username;
            req.session.userID = user.id;
        }
    }

    if(log.logged) console.log(`${username} logged in successfully !`);
    else console.log(`${username} failed to log in...`);

    // Send Auth
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(log));
});

/* LOGOUT */
app.post('/logout', (req, res) => {
    req.session.destroy();
    console.log('someone logged out');

    // Send Auth
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({logged: false}));
});

/* AM I LOGGED IN OR NOT ? */
app.post('/auth', (req, res) => {
    
    // Send Auth
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        logged: (typeof req.session != 'undefined'
                && typeof req.session.userID != 'undefined')
    }));
});

/* NEWSFEED */
app.post('/newsfeed', (req, res) => {
    if(req.session.userID != 'undefined') {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            posts: db.posts,
            canLoadMore: true
        }));
    }
});

/* COMMENT */
app.post('/comment', (req, res) => {
    if(req.session.userID != 'undefined') {
        const user = db.getUserFromID(req.session.userID);

        if(user != undefined) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(db.addComment(req.body.postID, user.username, req.body.comment)));
        }
    }
});

/* ADD POST */
app.post('/post', (req, res) => {
    if(req.session.userID != 'undefined') {
        const user = db.getUserFromID(req.session.userID);

        if(user != undefined) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(db.addPost(user.username, req.body.post)));
        }
    }
});

/*** TESTING ZONE ***/

/*** REQUESTS ***/
app.use((req, res) => {
    res.render('layout.pug');
});

app.listen(8080);