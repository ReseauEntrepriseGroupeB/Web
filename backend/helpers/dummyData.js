const {v4: uuidv4} = require('uuid');

const dummyUsers = [];

const emails = ['james@gmail.com', 'john@gmail.com', 'william@gmail.com', 'paul@gmail.com', 'roger@gmail.com'];

Array(5).fill(0).forEach((x, i) => {

    dummyUsers.push({
        id: uuidv4(),
        nom: emails[i].split("@")[0].split('').reverse().join(''),
        prenom: emails[i].split("@")[0].split('').sort(() => Math.random() - 0.5).join(''),
        email: emails[i],
        telephone: "+32485710634",
        dateRDV: randomDate(new Date(2020, 1, 1), new Date(2020, 3, 1)),
        createdAt: new Date(),
        updatedAt: new Date()
    });
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


module.exports = {
    dummyUsers,
    emails,
}
