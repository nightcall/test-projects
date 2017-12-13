import express from 'express';
import pug from 'pug';
import url from 'url';
import session from 'express-session';
import bodyParser from 'body-parser';
import knex from './knex';

const app = express();

app.set('view-engine', 'pug');
app.set('views', __dirname + '/views');
app.disable('x-powered-by');

/** MIDDLEWARES **/
app.use(express.static(__dirname + '/../../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
    extended: true
}));

app.use(session({
    secret: '5Er4tz3fS718tY',
    resave: false,
    saveUninitialized: false
}));

/** REQUESTS **/
app.post('/postslist', (req, res) => {
    // A CHANGER !!!!!
    //if(req.session.userID) {
    if(true) {

        // GET POST LIST [DIRTY CODE!!]
        let posts;
        knex.select('Posts.*', 'Users.username').from('Posts')
        .innerJoin('Users', 'Posts.userid', 'Users.id')
        .orderBy('id', 'desc')
        .then(data => {
            posts = data;

            for(let p of posts) {
                p.comments = [];
            }

            return knex.select('Comments.*', 'Users.username').from('Comments')
                .innerJoin('Users', 'Comments.userid', 'Users.id');
        })
        .then(comments => {
            for(let c of comments) {
                let post = posts.find(p => c.postid == p.id);
                
                if(post)
                    post.comments.push(c);
            }

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(posts));
        });
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.send('not connected, cannot get post list');
    }
});

app.post('/addpost', (req, res) => {
    // A CHANGER !!!!!
    //if(req.session.userID) {
    if(true) {
        const newPost = {
            userid: req.body.userid,
            content: req.body.content,
            timestamp: Date.now()
        };

        knex.insert(newPost, 'id')
        .into('Posts')
        .then(id => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                id: id,
                comments: [],
                username: 'sara',
                ...newPost
            }));
        })
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.send('not connected, cannot add post');
    }
});

app.post('/login', (req, res) => {
    // A CHANGER !!!!!
    //if(!!req.session.userID) {
    if(true) {
        const {
            username,
            password
        } = req.body;

        knex.select('*')
        .from('Users')
        .where({username: username, password: password})
        .then(results => {
            if(results.length) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    username: username
                }));
            } else {
                res.status(500);
                res.end();
            }
        })
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.send('already connected dumbass');
    }
});

app.post('/addcomment', (req, res) => {
    // A CHANGER !!!!!
    //if(req.session.userID) {
    if(true) {
        const newComment = {
            userid: req.body.userid,
            postid: req.body.postid,
            content: req.body.content,
            timestamp: Date.now()
        };

        knex.insert(newComment, 'id')
        .into('Comments')
        .then(id => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                id: id,
                username: 'sara',
                ...newComment
            }));
        })
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.send('not connected, cannot add post');
    }
});

app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.render('layout.pug');
});

app.listen(8888);

/*

import express from 'express';
import pug from 'pug';
import url from 'url';
import bodyParser from 'body-parser';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import React from 'react';
import App from '../client/App';

const app = express();

app.set('view-engine', 'pug');
app.set('views', __dirname + '/views');
app.disable('x-powered-by');

app.use(express.static(__dirname + '/../../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
    extended: true
}));

app.get('*', (req, res) => {
    const context = {};
    const html = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context} >
            <App />
        </StaticRouter>);

    if(context.url) {
        res.writeHead(302);
        res.end();
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.render('layout.pug', {renderedHTML: html});
    }
});

app.listen(8888);

*/