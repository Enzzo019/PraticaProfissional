const ClienteModel = require("../models/Cliente");

async function cadastrar(req, res) {
    try {
        const { nome, endereco, email, telefone, senha } = req.body;
        if (!nome || !email || !senha ) {
            return res,status(400).json({ mensagem: "Campos Obrigátorios, preencha!"});
        }
        await ClienteModel.cadastrarCliente({ nome, endereco, email, telefone, senha});
        res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!", email});
    } catch (erro) {
        console.log("Erro ao cadastrar cliente", erro);
        res.status(500).json({ mensagem: "Ocorreu um erro ao cadastrar cliente!"});
    }
}

async function buscaPorEmail (req, res) {
    try {
        const { email } = req.body;
        const cliente = await ClienteModel.buscaPorEmail(email);
        if (!cliente.recordset.length) {
            return res.status(404).json({ mensagem: "Cliente não encontrado!"});
        }
        res.json(cliente);
    } catch (erro) {
        console.log("Erro ao buscar o cliente", erro);
        res.status(500).json({ mensagem: "Ocorreu um erro ao buscar o cliente!"});
    }
}

module.exports = {cadastrar, buscaPorEmail};

