require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mssql = require("mssql");
const app = express();
const porta = process.env.PORTA;
const stringSQL = process.env.CONNECTION_STRING;


app.use(cors({ origin: "*" }));
app.use(express.json());

async function conectaBD() {
  try {
    await mssql.connect(stringSQL);
    console.log("Conexão com o banco realizada!");
  } catch (error) {
    console.log("Erro na conexão com o BD:", error);
  }
}
conectaBD();


const produtoRouter = require("./routes/ProdutoRoutes");
app.use("/produtos", produtoRouter);

const clienteRouter = require("./routes/ClienteRoutes");
app.use("/clientes", clienteRouter);

const categoriaRouter = require("./routes/CategoriaRoutes");
app.use("/categorias", categoriaRouter);


app.use("/", (req, res) =>
  res.json({ mensagem: "Servidor em execução, API funcionando!" })
);

app.listen(porta, () => console.log(`API rodando na porta ${porta}`));
