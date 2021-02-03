const Sequelize = require("sequelize");
const dbConnection = require("../config/database");


const Client = dbConnection.define('client', {
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
        validate: {len: [2, 32]}
    },
    nom: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {len: [2, 32]}
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
});

module.exports = Client;
