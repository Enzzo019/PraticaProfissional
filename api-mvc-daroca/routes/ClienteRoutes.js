const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/ClienteController");

router.post("/cadastro", clienteController.cadastrar);
router.get("/:email", clienteController.buscaPorEmail);

module.exports = router;