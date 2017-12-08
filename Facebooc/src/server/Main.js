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

/*** REQUESTS ***/
app.use((req, res) => {
    res.render('layout.pug');
});

app.listen(8080);