module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('clients', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
                isUUID: 4
            },
            prenom: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: { len: [2, 32] }
            },
            nom: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: { len: [2, 32] }
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                isEmail: true
            },
            telephone: {
                type: Sequelize.STRING,
                allowNull: false,
                notEmpty: true
            },
            dateRDV: {
                type: Sequelize.DATE,
                allowNull: false,
                notEmpty: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        })
    },
    down: queryInterface => queryInterface.dropTable('clients')
}