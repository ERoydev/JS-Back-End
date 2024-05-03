const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Web request')
    res.write('You are inside')
    res.end();
})

server.listen(5000);
console.log('Server is running on port 5000...')