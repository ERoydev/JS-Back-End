const fs = require('fs/promises');

// Synchronous variant is used for debugging ONLY
// fs.readFileSync(......)

// Asynchronous variant is used in general.
fs.readFile('./data.txt', {encoding: 'utf-8'})
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log('There is an error with the file system!')
    })


fs.readdir('.', 'utf-8')
    .then(res => console.log(res))


fs.writeFile('./data.txt', '\nAdd this DEEZ NUTS', {encoding: 'utf-8', flag: 'a'})
    .then(res => console.log('File is created'))
    .catch(res => console.log("There is error with write file."))