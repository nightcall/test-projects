import express from 'express';
import url from 'url';
import multer from 'multer';
import bodyParser from 'body-parser';
import knex from './knex';

const app = express();

/*** MIDDLEWARES ***/
app.use(express.static(__dirname + '/../../public'));
app.use(bodyParser.json());

/*** UPLOAD ***/
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + '.jpg');
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'image/png'
        || file.mimetype == 'image/jpeg'
        || file.mimetype == 'image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
            cb(new Error('File type not supported :('));
        }
    }
});

app.post('/upload', (req, res) => {
    upload.single('picture')(req, res, err => {
        res.setHeader('Content-Type', 'text/plain');
        if(err) {
            res.status(500);
            res.send(err.message)
        } else {
            res.status(200);
            res.send(err ? err.message : '/uploads/' + req.file.filename);
        }
    });
});

app.post('/post', (req, res) => {
    knex.select('*').from('images').where('id', '=', req.body.id)
    .then(post => {
        knex.select('*').from('comments').innerJoin('images', 'comments.imageId', '=', 'images.id')
        .then(comments => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({path: post[0].path, comments: comments}));
        });
    });
});

app.post('/comment', (req, res) => {
    knex.insert({imageId: req.body.id, content: req.body.comment}).into('comments')
    .then(row => {
        res.setHeader('Content-Type', 'text/plain');
        res.send(req.body.comment);
    });
});

/*** UNIVERSAL RENDERER ***/
app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
            </head>
            <body>
                <div id='root'></div>
                <script src='/bundle.js'></script>
            </body>
        </html>
    `);
});

app.listen(8080);