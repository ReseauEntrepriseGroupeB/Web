const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require('path');

const dbConnection = require("../backend/config/database");

const app = express();
dotenv.config();

// Defining the Middlewares
app.use(cors());

// BodyParser Midlleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public', 'dist')));

dbConnection.authenticate()
    .then(() => {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`Database connected successfully to ${process.env.POSTGRES_DB} database`)
        }
    })
    .catch(error => console.error("Unable to connect to database", error));

app.get('/', (req, res) => {
    return res.sendFile(path
        .join(__dirname + '/public', 'dist', 'index.html'))
});

// Bring in the user routers
const clients = require('./routes/clients');

app.use('/api/v1', clients);


app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});


