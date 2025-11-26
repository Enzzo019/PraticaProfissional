require("dotenv").config();
const porta = process.env.PORTA;
const stringSQL = process.env.CONNECTION_STRING;
const express = require("express");
const app = express();
const mssql = require("mssql");
const cors = require("cors");
app.use(express.json())

app.use(cors({
    origin:'*'
}))

app.use(express.json())

async function conectaBD() {
    try{
        await mssql.connect(stringSQL);
    }
    catch (error){
        console.log("erro na conexão com o BD",error)
    }
}
conectaBD()

app.get('/produtos',async (req,res)=>{
    const alunos = await mssql.query("SELECT * FROM daroca.produto")
    console.log(alunos)
    res.json(alunos);

})
app.get('/categorias',async (req,res)=>{
    const alunos = await mssql.query("SELECT * FROM daroca.categorias")
    console.log(alunos)
    res.json(alunos);

});

app.post('/comentarios',  async (req, res) => {
    const mensagem = req.body.mensagem;
    const email = req.body.usuario_email;
    try {
        await mssql.query(`INSERT INTO daroca.comentarios(mensagem,usuario) VALUES ('${mensagem}', '${email}')`);
        res.status(201).json({"sucesso": true, "mensagem": "dados inseridos com sucesso", "usuario_email" : email})  
    } catch (erro) {
        console.log("Erro na inserção de dados", erro)
    }
})

app.post('/cadastro',async(req,res)=>{
    try{
        const nome=req.body.nome;
        const endereco =req.body.endereco;
        const email=req.body.email;
        const telefone=req.body.telefone;
        const senha=req.body.senha;
        await mssql.query(`INSERT INTO daroca.Clientes(nome,endereco,email,telefone,senha) VALUES ('${nome}','${endereco}','${email}','${telefone}','${senha}')`)
        res.status(201).json({ "sucesso": true, "mensagem": "dados inseridos com sucesso", "email" : email })
    }
    catch (erro) {
        console.log("Erro na inserção de dados",erro)
    }
})
app.get('/produtos/:nome',async (req,res)=>{
    const nome = req.params.nome;
    const nome_produto = await mssql.query(`SELECT * FROM daroca.produto WHERE nome='${nome}'`)
    res.json(nome_produto);
})
app.get('/cadastro/:email',async (req,res)=>{
        const login_email = req.params.email;
        const nome_produto = await mssql.query(`SELECT * FROM daroca.Clientes WHERE email='${login_email}'`)
        res.json(nome_produto);

})
app.get('/logados/:email',async (req,res)=>{
    const email = req.params.email;
    const alunos = await mssql.query(`SELECT * FROM daroca.Clientes where email='${email}'`)
    console.log(alunos)
    res.json(alunos);
})

app.get('/prod/:id',async (req,res)=>{
    const id = req.params.id;
    const nome_produto = await mssql.query(`SELECT * FROM daroca.produto WHERE id='${id}'`)
    res.json(nome_produto);
})
app.post('/comprado', async (req, res) => {
    try {
        const { email, numero_compra, produtos } = req.body;

        const produtosJSON = JSON.stringify(produtos);

        await mssql.query`
            INSERT INTO daroca.comprado (numero_compra, email, produtos)
            VALUES (${numero_compra}, ${email}, ${produtosJSON})
        `;

        res.status(201).json({
            sucesso: true, 
            mensagem: "Dados inseridos com sucesso",
            email
        });
    }
    catch (erro) {
        console.log("Erro na inserção de dados:", erro);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});
app.get('/historico/:email',async (req,res)=>{
    const email = req.params.email;
    const nome_produto = await mssql.query(`SELECT * FROM daroca.comprado WHERE email='${email}'`)
    res.json(nome_produto);
})


app.use('/',(req,res) => res.json({mensagem: 'servidor em execusão'}) )

app.listen(porta, () => console.log("API funcionando!"))
