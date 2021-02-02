const dotenv = require("dotenv");
dotenv.config();

const env = Object.freeze({ ...process.env });

module.exports = env;
