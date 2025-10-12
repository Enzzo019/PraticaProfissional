const mssql = require("mssql");

async function listarCategorias() {
    const resultado = await mssql.query("SELECT * FROM daroca.categoria");
    return resultado.recordset;
}

module.exports = { listarCategorias };