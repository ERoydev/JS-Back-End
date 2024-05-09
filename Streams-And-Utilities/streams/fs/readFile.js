// const fs = require('fs')
const fs = require('fs/promises');

// SYNCHRONOUS
// const text = fs.readFileSync('./data.txt', { encoding: 'utf-8'});
// console.log(text);

// ASYNCHRONOUS with Callback
// fs.readFile('./data.txt', { encoding: 'utf-8'}, (err, result) => {
//     if (err) {
//         console.log('There is a problem with filesystem');
//         return;
//     }

//     console.log(result)
// })

// ASYNC WITH PROMISES
// fs.readFile('./data.txt', {encoding: 'utf-8'}) 
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(`There is an error with file system`);
//     })

// DEBUGGING
console.log(1);
fs.readFile('./data.txt', { encoding: 'utf-8'}, (err, result) => {
    if (err) {
        console.log('There is a problem with filesystem');
        return;
    }

    console.log(2)
    console.log(result)
});
console.log(3)