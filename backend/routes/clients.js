
const express  = require("express");

const router = express.Router();

const ctrlClients = require("../controllers/clients");

router.get("/clients", ctrlClients.clients);
router.post("/register", ctrlClients.createClient);
router.get("/rdv/:date", ctrlClients.getDate);

module.exports = router;
