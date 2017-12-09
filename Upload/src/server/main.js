import express from 'express';
import url from 'url';
import multer from 'multer';

const app = express();

/*** MIDDLEWARES ***/
app.use(express.static(__dirname + '/../../public'));

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

/*** UNIVERSAL RENDERER ***/
app.get('*', (req, res) => {
    console.log(url.parse(req.url).pathname);

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