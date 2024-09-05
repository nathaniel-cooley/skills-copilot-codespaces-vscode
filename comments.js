// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                response.end('Server Error...');
            }
            response.end(data);
        });
    } else if (pathname === '/submit') {
        var comment = urlObj.query;
        comments.push(comment);
        response.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, pathname), 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                response.end('Server Error...');
            }
            response.end(data);
        });
    }
});
server.listen(3000, function () {
    console.log('Server is listening at port 3000...');
});