const express = require("express");
const bodyParser = require('body-parser');
const actions = require('./server/postsActions.js');
const validate = require('./server/validate.js');
const fs = require('fs');
const url = require('url');
const multer = require('multer');
const picsPath='./public/pics/';
const upload = multer({
    dest: picsPath
});
let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api/posts/all', (req, res) => {
    let body = req.body;
    let photoPosts = actions.getPhotoPosts(body.skip, body.top, body.filterConfig);
    res.statusCode = 200;
    if (photoPosts) {
        res.send(photoPosts);
    }
    else {
        res.send(false);
    }
})
app.get('/api/posts', (req, res) => {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let id = query.id;
    let post = actions.getPhotoPost(id);
    res.statusCode = 200;
    if (post) {
        res.send(post);
    }
    else {
        res.send(false);
    }
})
app.post('/api/posts', (req, res) => {
    let body = req.body;
    if (actions.addPhotoPost(body))
        res.send(true);
    else
        res.send(false);
    res.statusCode = 200;
})
app.put('/api/posts', (req, res) => {
    let body = req.body;
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let id = query.id;
    if (actions.editPhotoPost(id, body))
        res.send(true);
    else
        res.send(false);
    res.statusCode = 200;
})
app.delete('/api/posts', (req, res) => {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let id = query.id;
    if (actions.removePhotoPost(id))
        res.send(true);
    else
        res.send(false);
    res.statusCode = 200;
})
app.put('/api/likes', (req, res) => {
    let body = req.body;
    if (body.add) {
        if (actions.addLike(body.id, body.name))
            res.send(true);
        else
            res.send(false);
        res.statusCode = 200;
    }
    else {
        if (actions.delLike(body.id, body.name))
            res.send(true);
        else
            res.send(false);
        res.statusCode = 200;
    }
})
app.post('/api/users', (req, res) => {
    let body = req.body;
    res.statusCode = 200;
    if (validate(body)) {
        res.send(true);
    }
    else {
        res.send(false);
    }
})
app.post('/api/images', upload.single('img'), (req, res) => {
    let tmp_path = req.file.path;
    let target_path = picsPath + req.file.originalname;
    let src = fs.createReadStream(tmp_path);
    let dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function () { res.send('pics/'+ req.file.originalname); });
    src.on('error', function (err) { res.send(); });
    fs.unlink(tmp_path);
})

app.listen('3000', () => {
    console.log('Server is running');
});