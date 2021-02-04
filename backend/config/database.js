const Sequelize = require("sequelize");

const env = require("./environment");

let dbConnection = ''

if (env.NODE_ENV === 'dev') {
    dbConnection = new Sequelize(
        env.POSTGRES_DB,
        env.POSTGRES_USER,
        env.POSTGRES_PASSWORD, {
            dialect: 'postgres',
            logging: true,
            port: 5432,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            replication: {
                read: [{host: env.POSTGRES_HOST_SLAVE, user: env.POSTGRES_USER, pass: env.POSTGRES_PASSWORD}],
                write: [{host: env.POSTGRES_HOST, user: env.POSTGRES_USER, pass: env.POSTGRES_PASSWORD}]
            }
        }
    )
}

module.exports = dbConnection;
