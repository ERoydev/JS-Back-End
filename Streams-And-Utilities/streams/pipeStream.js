const fs = require('fs');

const readStream = fs.createReadStream('./data/input.txt', {encoding: 'utf-8', highWaterMark: 100});
const writeStream = fs.createWriteStream('./data/copy.txt', {encoding: 'utf-8', highWaterMark: 100});

// Tova e kato readWriteStream kato funkcionalnost

readStream.pipe(writeStream);
// Vseki put kogato se chete chunk zapishi go