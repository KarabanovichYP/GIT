const http = require('http');
const fs = require('fs');
const staticBasePath = './public';

const staticServe = function (req, res) {
    const url = (req.url === '/') ? '/index.html' : req.url;
    fs.readFile(staticBasePath + url, (err, data) => {
        if (err)
            res.end('error');
        else
            res.end(data);
    });
};
const httpServer = http.createServer(staticServe);
httpServer.listen(8080);