const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const pug = require('pug');
const app = express();

/*** USER DATABASE ***/
const UserDatabase = require('./Users.js');
let userDB = new UserDatabase;
userDB.addUser({ username: 'john', password: '1234' });
userDB.addUser({ username: 'sara', password: '1234' });
userDB.addUser({ username: 'oliver', password: '1234' });


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
    let logged = false;

    const {
        username,
        password
    } = req.body;

    if(username && password) {
        userDB.users.forEach(u => {
            if(u.username == username
            && u.password == password) {
                logged = true;
                req.session.userID = u.id;
            }
        });
    }

    if(logged) console.log(`${username} logged in successfully !`);
    else console.log(`${username} failed to log in...`);

    // Send Auth
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({logged: logged}));
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

/*** REQUESTS ***/
app.use((req, res) => {
    res.render('layout.pug');
});

app.listen(8080);