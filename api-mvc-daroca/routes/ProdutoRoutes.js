const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/ProdutoController");

router.get("/", produtoController.listarProdutos);
router.get("/nome/:nome", produtoController.buscaPorNome);
router.get("/id/:id", produtoController.buscaPorId);  

module.exports = router;