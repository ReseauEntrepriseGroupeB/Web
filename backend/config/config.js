const env = require("./environment");

module.exports = {
    dev: {
        dialect: 'postgres',
        username: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        database: env.POSTGRES_DB,
        host: env.POSTGRES_HOST,
        port: 5432,
        dialectOptions: {
            bigNumberStrings: true
        }
    }
}
