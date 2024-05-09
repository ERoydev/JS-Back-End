const http = require('http');
const messageBroker = require('./messageBroker');
// Initialize services
require('./logger');
require('./reportingService');


const server = http.createServer((req, res) => {
    messageBroker.publish('request', `URL: ${req.url}; METHOD: ${req.method}`);
    
    // Handle request
    if (req.url === '/register') {
        messageBroker.publish('user-register', {username: 'Pesho'});
    }
    res.end();
})

server.listen(5000)
console.log('Server is running on port 5000...')