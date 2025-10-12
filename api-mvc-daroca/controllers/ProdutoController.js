const ProdutoModel = require("../models/Produto");

async function listarProdutos(req, res) {
    try {
        const produtos = await ProdutoModel.listarProdutos();
        res.json(produtos);
    }   catch(erro) {
        console.log("Erro ao listar produtos!", erro)
        res.status(500).json({ erro: "Ocorreu um erro ao listar os produtos!"})
    }
}

async function buscaPorNome (req, res) {
    try {
        const { nome } = req.params;
        const produto = await ProdutoModel.buscarPorNome(nome);
        res.json(produto);
    } catch (erro) {
        console.log("Erro ao buscar produto pelo nome!", erro);
        res.status(500).json({ erro: "Erro ao buscar o produto por nome!"});
    }
}

async function buscaPorId(req, res) {
    try {
        const { id } = req.params;
        const produto = await ProdutoModel.buscaPorId(id);
        res.json(produto);
    } catch (erro) {
        console.log("Erro ao buscar produto pelo ID!", erro);
        res.status(500).json({ erro: "Erro ao buscar o produto pelo ID!"})
    }
}

module.exports = {listarProdutos, buscaPorNome, buscaPorId};
