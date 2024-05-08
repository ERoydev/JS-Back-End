const http = require('http');

const homeTemplate = require('./views/home');
const addCatTemplate = require('./views/addcat.html.js');
const addBreedTemplate = require('./views/addbreed.html.js');

const siteCss = require('./views/site.css.js');
const utils = require('./utils.js');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        res.write(homeTemplate);
        res.end();

    } else if (req.url === '/styles/site.css') {
        res.writeHead(200, {
            'Content-Type': 'text/css',
        });
    
        res.write(siteCss);
        res.end();

    } else if (req.url === '/cats/add-cat') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        res.write(addCatTemplate);
        res.end();

    } else if (req.url === '/cats/add-breed') {
        if (req.method === 'GET') {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
    
            res.write(addBreedTemplate);
            res.end();

        } else if (req.method === 'POST') {
            console.log(req)
        }

    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        res.write('<h1>404</h1>');
        res.end();
    }
    
})

server.listen(5000);
console.log('Server is running on port 5000...')