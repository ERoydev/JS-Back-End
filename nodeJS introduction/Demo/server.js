const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Web request')

    console.log('HTTP Version: ', req.httpVersion);
    console.log('HTTP Method: ', req.method);
    console.log('URL: ', req.url);

    if (req.url === '/') {
        // ROUTING VERY BASIC
        res.write('<h1>Home page content</h1>')

    } else if (req.url === '/cats') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('<h1>Cats Page</h1>')

    } else {
        res.write('<h1>Other page</h1>')
    }

    res.end()

})

server.listen(5000);
console.log('Server started on port 5000....')

