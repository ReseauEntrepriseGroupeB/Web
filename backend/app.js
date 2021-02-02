const Sequelize = require("sequelize");

const dotenv = require("dotenv")

const express = require("express");
const app = express();
dotenv.config();

app.get('/', function (req, res) {
    res.send("hello world")
});

let sequelize = new Sequelize("bedroom", "postgres", "postgre",{
    host: "localhost",
    dialect: "postgres",

    pool:{
        max: 5,
        min: 0,
        idle: 10000
    },
});

sequelize.authenticate()
    .then(() => {
    if (process.env.NODE_ENV === 'dev') {
            console.log("Database connected successfully to ${env.POSTGRES_DB} database")
        }
    })
    .catch(error => console.error("Unable to connect to database" , error));

app.listen(3000);

