const mssql = require("mssql");

async function listarProdutos() {
    const resultado = await mssql.query("SELECT * FROM daroca.produto");
    return resultado.recordset;
}

async function buscaPorNome(nome) {
    const resultado = await mssql.query(`SELECT * FROM daroca.produto WHERE nome = '${nome}'`);
    return resultado.recordset;
}

async function buscaPorId(id) {
    const resultado = await mssql.query(`SELECT * FROM daroca.produto WHERE id = '${id}'`);
    return resultado.recordset;
}

module.exports = {listarProdutos, buscaPorNome, buscaPorId};