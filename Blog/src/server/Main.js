var express = require('express');
var pug = require('pug');
var path = require('path');
var bodyParser = require('body-parser');

var posts = new Array(25).fill({}).map((n, i) => {
    return {
        id: i,
        title: `Post [id=${i}]`,
        text: 'Bla bla bla bla',
        comments: []
    };
});

var app = express();

app.set('view-engine', 'pug');
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/../../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({
    extended: true
}));

/* Get a specific post */
app.post('/post', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(posts[req.body.postId]));
});

/* get a list of posts */
app.post('/posts', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        posts: posts.slice(req.body.from, req.body.to),
        canLoadMore: req.body.to < posts.length
    }));
});

/* Post a comment */
app.post('/comment', (req, res) => {
    posts[req.body.postId].comments.push({author: req.body.author, message: req.body.message});

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(posts[req.body.postId].comments));
});

app.get('/*', (req, res) => {
    res.render('layout.pug');
});

app.listen(8080);