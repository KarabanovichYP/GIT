let actions = require('./server/postsActions.js');
const http = require('http');
const fs = require('fs');
const Url = require('url');
const staticBasePath = './public';
const staticServe = function (req, res) {
    let pathName = Url.parse(req.url).pathname;
    let query = Url.parse(req.url, true).query;
    if (req.method === 'PUT' && pathName === '/api/posts') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            let photoPosts = actions.getPhotoPosts(body.skip, body.top, body.filterConfig);
            if (photoPosts) {
                res.statusCode = 200;
                res.end(JSON.stringify(photoPosts));
            }
            else {
                res.statusCode = 404;
                res.end();
            }
        })

    }
    else if (req.method === 'GET' && pathName === '/api/post') {
        let id = query.id;
        let post = actions.getPhotoPost(id);
        if (post) {
            res.statusCode = 200;
            res.end(JSON.stringify(post));
        }
        else {
            res.statusCode = 400;
            res.end();
        }

    }
    else if (req.method === 'POST' && pathName === '/api/posts') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            if (actions.addPhotoPost(JSON.parse(body)))
                res.statusCode = 200;
            else
                res.statusCode = 400;
            res.end();
        })
    }
    else if (req.method === 'PUT' && pathName === '/api/post') {
        let id = query.id;
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            if (actions.editPhotoPost(id, JSON.parse(body)))
                res.statusCode = 200;
            else
                res.statusCode = 400;
            res.end();
        })

    }
    else if (req.method === 'DELETE' && pathName === '/api/post') {
        let id = query.id;
        if (actions.removePhotoPost(id))
            res.statusCode = 200;
        else
            res.statusCode = 400;
        res.end();
    }
    else if (req.method === 'PUT' && pathName === '/api/posts/likes') {
        if (query.add) {
            if (actions.addLike(query.id, query.name))
                res.statusCode = 200;
            else
                res.statusCode = 400;
        }
        else {
            if (actions.delLike(query.id, query.name))
                res.statusCode = 200;
            else
                res.statusCode = 400;
        }
        res.end();
    }
    else {
        const url = (req.url === '/') ? '/index.html' : req.url;
        fs.readFile(staticBasePath + url, (err, data) => {
            if (err) {
                res.statusCode = 400;
                res.end();
            }
            else
                res.end(data);
        });
    }
};
const httpServer = http.createServer(staticServe);
httpServer.listen(8080);