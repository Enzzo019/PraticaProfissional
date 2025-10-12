const { mssql } = require("../config/db");

async function listarProdutos() {
    return await mssql.query("SELECT * FROM daroca.produto");
}

async function buscaPorNome() {
    return await mssql.query(`SELECT * FROM daroca.produto WHERE nome = '${nome}'`)
}

async function buscaPorId() {
    return await mssql.query(`SELECT * FROM daroca.produto WHERE id = '${id}'`);
}

module.exports = {listarProdutos, buscaPorNome, buscaPorId};