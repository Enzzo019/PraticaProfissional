const { mssql } = require("../config/db");

async function cadastrarCliente ({ nome, endereco, email, telefone, senha}) {
    const query = `INSERT INTO daroca.Clientes (nome, endereco, email, telefone, senha) VALUES ('${nome}', '${endereco}', '${email}', '${telefone}', '${senha}')`;
    return await mssql.query(query);
}

async function buscaPorEmail(email) {
    const query = `SELECT * FROM daroca.Clientes WHERE email = '${email}'`;
    return await mssql.query(query);
}

module.exports = { cadastrarCliente, buscaPorEmail};