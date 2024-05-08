const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./data/input.txt', {encoding: 'utf-8', highWaterMark: 100});
const writeStream = fs.createWriteStream('./data/transformed.txt', {encoding: 'utf-8', highWaterMark: 100});
const gzipTransformStream = zlib.createGzip();

readStream.pipe(gzipTransformStream).pipe(writeStream)
