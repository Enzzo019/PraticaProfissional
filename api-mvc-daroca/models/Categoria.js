const { mssql } = require("../config/db");

async function listarCategorias() {
    return await mssql.query("SELECT * FROM daroca.categorias");
}

module.exports = {listarCategorias};