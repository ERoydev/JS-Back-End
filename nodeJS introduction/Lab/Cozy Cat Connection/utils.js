const fs = require('fs');

function createNewCat(data) {
    fs.readFile('./data/cats.json', { encoding: 'utf-8'}, (err, result) => {
        if (err) {
            console.log('Error Occured when creating a new Cat.');
            return;
        };

        const existingData = JSON.parse(result);
        const nextCatId = Number(existingData[existingData.length-1].id) + 1;

        let newCat = {
            "id": `${nextCatId}`,
            "name": `${data.name}`,
            "description": `${data.description}`,
            "imageUrl": `${data.imageUrl}`,
            "breed": `${data.breed}`
        }

        existingData.push(newCat)
        let updatedData = JSON.stringify(existingData, null, 2);

        fs.writeFile('./data/cats.json', updatedData, (err) => {
            if (err) {
                throw new Error('Error occured when trying to write into cats.json');
            }

            console.log('Cat created successfully!')
        });

        return existingData;
    });
};


module.exports = {
    createNewCat,
}