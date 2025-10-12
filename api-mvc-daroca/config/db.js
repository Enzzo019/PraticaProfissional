require("dotenv").config();
const mssql = require("mssql");
const  connectionString = process.env.CONNECTION_STRING

async function conectaBD() {
    try {
        await mssql.connect(connectionString);
        console.log("Conectado ao Banco de Dados!")
    } catch (erro) {
        console.log("Erro na conexão ao Banco de Dados!")
    }

}
module.exports = { mssql, conectaBD }