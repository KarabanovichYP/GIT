const express = require("express");
const bodyParser = require('body-parser');
let actions = require('./server/postsActions.js');
const fs = require('fs');
const url = require('url');
let app = express();
app.use(express.static('public'));
app.use(bodyParser.json());


app.post('/api/posts/all', (req, res) => {
    let body = req.body;
    let photoPosts = actions.getPhotoPosts(body.skip, body.top, body.filterConfig);
    if (photoPosts) {
        res.statusCode = 200;
        res.send(JSON.stringify(photoPosts));
    }
    else {
        res.statusCode = 404;
        res.send();
    }
})
app.get('/api/posts', (req, res) => {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let id = query.id;
    let post = actions.getPhotoPost(id);
    if (post) {
        res.statusCode = 200;
        res.send(JSON.stringify(post));
    }
    else {
        res.statusCode = 400;
        res.send();
    }
})
app.post('/api/posts', (req, res) => {
    let body = req.body;
    if (actions.addPhotoPost(body))
        res.statusCode = 200;
    else
        res.statusCode = 400;
    res.send();
})
app.put('/api/posts', (req, res) => {
    let body = req.body;
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let id = query.id;
    if (actions.editPhotoPost(id, body))
        res.statusCode = 200;
    else
        res.statusCode = 400;
    res.send();
})
app.delete('/api/posts', (req, res) => {
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let id = query.id;
    if (actions.removePhotoPost(id))
        res.statusCode = 200;
    else
        res.statusCode = 400;
    res.send();
})
app.put('/api/likes', (req, res) => {
    let body=req.body;
    if (body.add) {
        if (actions.addLike(body.id, body.name))
            res.statusCode = 200;
        else
            res.statusCode = 400;
    }
    else {
        if (actions.delLike(body.id, body.name))
            res.statusCode = 200;
        else
            res.statusCode = 400;
    }
    res.send();
})

app.listen('3000', () => {
    console.log('Server is running');
});