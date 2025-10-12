const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/CategoriaController");

router.get("/", categoriaController.listarCategorias);

module.exports = router;