'use strict'
const consola = require('consola')
const { dummyUsers, emails } = require('../helpers/dummyData')

module.exports = {

    up: (queryInterface, Sequelize) => {
        consola.info({ message: 'Seeding clients into the database...', badge: true })
        return queryInterface.bulkInsert('clients', dummyUsers, {})
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op
        return queryInterface.bulkDelete('clients',
            { email: { [Op.in]: [...emails] } }, {})
    }
}
