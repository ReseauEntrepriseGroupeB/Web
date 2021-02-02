const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const {products} = require('./dummyProducts')
const helper = require('./dummyHelpers')

const dummyUsers = []
const dummyGroups = []
const dummyPersonalGroups = []
const dummyUserGroups = []
const shoppingList = []
const reverse = []

const usernames = ['james', 'john', 'william', 'paul', 'thomas', 'kevin', 'gary', 'larry', 'dennis', 'roger']
const groups = ['football', 'tennis', 'basketball', 'volleyball', 'hockey', 'cricket', 'baseball', 'golf', 'rugby', 'boxing']

const langage = 'french'

Array(10).fill(0).forEach((x, i) => {
    const groupInfo = helper.generateGroupInfos(usernames[i], langage)

    dummyUsers.push({
        firstName: usernames[i].split('').reverse().join(''),
        lastName: usernames[i].split('').sort(() => Math.random() - 0.5).join(''),
        username: usernames[i],
        email: `${usernames[i]}@gmail.com`,
        userId: uuidv4(),
        password: bcrypt.hashSync('toto', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    })
});

module.exports = {
    dummyUsers,
    usernames,
}
