const mssql = require("mssql");

async function cadastrar(cliente) {
    const {nome, endereco, email, telefone, senha } = cliente;
    await mssql.query(`INSERT INTO daroca.Clientes (nome, endereco, email, telefone, senha) VALUES ('${nome}','${endereco}','${email}','${telefone}','${senha}')`);
    return { mensagem: "Dados inseridos com sucesso!", email};
}

async function buscaPorEmail(email) {
    const resultado = await mssql.query(`SELECT * FROM daroca.Cleintes WHERE email = '${email}'`);
    return resultado.recordset;
}

module.exports = {cadastrar, buscaPorEmail};