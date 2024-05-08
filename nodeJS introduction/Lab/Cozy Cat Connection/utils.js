const fs = require('fs');

function createNewBreed(breedName) {
    fs.writeFile('./data/breeds.json', breedName, err => {
        if (err) {
            console.log(err);
        } else {
            console.log('file created')
        }
    })
}

module.exports = {
    createNewBreed
}