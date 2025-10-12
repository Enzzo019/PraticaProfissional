const CategoriaModel = require("../models/Categoria");

async function listarCategorias(req, res) {
    try {
        const categorias = await CategoriaModel.listarCategorias();
        res.json(categorias);
    } catch (erro) {
        console.log("Erro ao listar as categorias!", erro);
        res.status(500).json({ mensagem: "Ocorreu um erro ao listar as categorias!"});
    }
}

module.exports = {listarCategorias};