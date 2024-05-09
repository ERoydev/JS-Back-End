const http = require('http');
const fs = require('fs');
const querystring = require('querystring')
const utils = require('./utils.js');

const views = {
    home: './views/home.html',
    style: './views/site.css',
    addCat: './views/addcat.html',
    addBreed: './views/addbreed.html',
    cat: './views/partials/cat.html',
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        render(views.cat, {name: 'Pesho', description: 'Very angry cat but cute', breed: 'Persian cat'}, (err, catResult) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }

            render(views.home, { cats: catResult}, (err, result) => {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                });

                res.write(result);
                res.end();
            })
        });


    } else if (req.url === '/styles/site.css') {
        fs.readFile(views.style, { encoding: 'utf-8'}, (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }

            res.writeHead(200, {
                'Content-Type': 'text/css',
            });

            res.write(result);
            res.end();
        })
    } else if (req.url === '/cats/add-cat' && req.method ==='GET') {
        fs.readFile(views.addCat, { encoding: 'utf-8'}, (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }

            res.writeHead(200, {
                'Content-Type': 'text/html',
            });

            res.write(result);
            res.end();
        })
    } else if (req.url === '/cats/add-cat' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        })  

        req.on('end', () => {
            body = querystring.parse(body);

            utils.createNewCat(body);

            render(views.home, { }, (err, result) => {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                });

                res.write(result);
                res.end();
            })
        })


    } else if (req.url === '/cats/add-breed' && req.method === 'GET') {
        fs.readFile(views.addBreed, { encoding: 'utf-8'}, (err, result) => {
            if (err) {
                res.statusCode = 404;
                return res.end();
            }
            
            res.writeHead(200, {
                'Content-Type': 'text/html',
            })
            
            res.write(result);
            res.end();
        }); 

    } else if (req.url === '/cats/add-breed' && req.method === 'POST') {
        return;        
    }
});

function render(view, data, callback) {
    fs.readFile(view, {encoding: 'utf-8'}, (err, result) => {
        if (err) {
            return callback(err);
        }  

        const htmlResult = Object.keys(data).reduce((acc, key) => {
            const pattern = new RegExp(`{{${key}}}`, 'g');
            
            return acc.replace(pattern, data[key]);
        }, result);

        callback(null, htmlResult);
    });
}

server.listen(5000);
console.log('Server is running on url: http://localhost:5000/')