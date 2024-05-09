const fs = require('fs');

const readStream = fs.createReadStream('./data/input.txt', {encoding: 'utf-8', highWaterMark: 100});
const writeStream = fs.createWriteStream('./data/copy.txt', {encoding: 'utf-8', highWaterMark: 100});


readStream.on('data', (chunk) => {
    writeStream.write('\n------------ new chunk -------------\n');
    writeStream.write(chunk);
})

readStream.on('end', () => {
    writeStream.end();
})
