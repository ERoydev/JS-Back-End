const events = require('events');

const eventEmitter = new events.EventEmitter();

// subscribe
eventEmitter.on('request', (eventData) => {
    console.log('on request - ' + eventData);
});

// publish
eventEmitter.emit('request', 'Request emitted');