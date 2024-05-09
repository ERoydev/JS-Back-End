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

let allCats = [];
async function getAllCats() {
    try {
        const data = await fs.promises.readFile('./data/cats.json', { encoding: 'utf-8' });
        allCats = JSON.parse(data);
    } catch (err) {
        throw new Error('Error occurred when trying to get all the cats from cats.json file!');
    }
}

async function main() {
    await getAllCats();

    const server = http.createServer((req, res) => {
        if (req.url === '/') {
            render(views.cat, allCats, (err, catResult) => {
                if (err) {
                    res.statusCode = 404;
                    return res.end();
                }

                render(views.home, [{ cats: catResult}], (err, result) => {
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
                
                const allCats = utils.createNewCat(body);
                
                render(views.home, { cats: allCats }, (err, result) => {
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

    server.listen(5000);
    console.log('Server is running on url: http://localhost:5000/')
}

main();

function render(view, dataArr, callback) {
    fs.readFile(view, {encoding: 'utf-8'}, (err, result) => {
        if (err) {
            return callback(err);
        }  

        const htmlResult = dataArr.map(data => {
            return Object.keys(data).reduce((acc, key) => {
                const pattern = new RegExp(`{{${key}}}`, 'g');
                
                return acc.replace(pattern, data[key]);
            }, result);
        }).join('\n');

        callback(null, htmlResult);
    });
}
