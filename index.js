require("dotenv").config();
const porta = process.env.PORTA;
const stringSQL = process.env.CONNECTION_STRING;
const express = require('express');
const app = express();
const mssql = require('mssql');
const cors = require("cors");

app.use(cors({
    origin:'*'
}));

app.use(express.json());

// FUNÇÃO ACESSAR BANCO DE DADOS!
async function connectBancoDados() {
    try {
        await mssql.connect(stringSQL)
        console.log("Conexão ao Banco de Dados bem sucedida!")
    } catch (erro) {
        console.log("Erro na conexão ao Banco de Dados!",erro)
    }
}
connectBancoDados();

app.get('/', (req, res) => {
    res.send("Servidor funcionando!");
});

// GET
app.get('/produtos',async (req,res)=>{
    const alunos = await mssql.query("SELECT * FROM daroca.produto")
    console.log(alunos)
    res.json(alunos);

})
// GET CATEGORIA
app.get('/categorias',async (req,res)=>{
    const alunos = await mssql.query("SELECT * FROM daroca.categorias")
    console.log(alunos)
    res.json(alunos);

})
// GET COM PARAMETRO
app.get('/produtos/:id', async (req,res) => {
    const id = parseInt(req.params.id);
    const resultados = await mssql.query('SELECT * FROM daroca.produtos WHERE ID=' + id);
    if (resultados.lenght != 0) {
        console.log(resultados.recordset)
        res.json(resultados.recordset);
    }
    else {
        res.status(404).json({ message: 'Produto não encontrado!'});
    }
})

// POST
app.post('/cadastro',(req,res)=>{
    try{
        
        const nome=req.body.nome;
        const endereco =req.body.endereco;
        const email=req.body.email;
        const telefone=req.body.telefone;
        const senha=req.body.senha;
        mssql.query(`INSERT INTO daroca.Clientes(nome,endereco,email,telefone,senha) VALUES ('${nome}','${endereco}','${email}','${telefone}','${senha}')`)
        res.status(201).json({"mensagem":"dados inseridos com sucesso."})
    }
    catch (erro) {
        console.log("Erro na inserção de dados",erro)
    }
})

/// DELETE
app.delete('/produtos/:id', async (req,res) => {
    try {
        const id = req.params.id;
        const produto = await mssql.query(`DELETE daroca.produtos WHERE ID= ${id}`);
        console.log("produto: " + produto.rowsAffected)
        if (produto.rowsAffected == 1){
            res.sendStatus(200).json({ message: 'Item excluido com sucesso!'});
        }
        else {
            res.status(404).json({ message: 'Produto não encontrado!'});
        }
    }
    catch (erro) {
        res.status(404).json({ message: 'Erro na exclusão do produto!'})
    }
})

// PATCH
app.patch('/produtos/:id', async (req,res) => {
    const id = req.params.id;
    const nome = req.params.nome;
    const valor = req.params.valor;
    const descricao = req.params.descricao;
    try {
        const sql = `UPDATE daroca.produtos SET nome='${nome}', valor='${valor}', descricao='${descricao}' WHERE ID=${id}`
        const produtoAlterado =await mssql.query(sql);
        console.log("produtoAlterado: " + produtoAlterado.rowsAffected)
        res.sendStatus(200);
    }
    catch (erro) {
        res.status(400).json({ error: `Erro ao alterar produto ${nome}, ${valor}, ${descricao}`});
    }
})

app.use("/produtos", (re,res) => res.json({ message: 'Servidor em execução!'}));

app.listen(porta, () => console.log(`API rodando na porta ${porta}`));

//// FALTAM OS MÉTODOS POST, PATCH, DELETE E GET COM PARAMETRO!!!!!!!!!!!!!!!

