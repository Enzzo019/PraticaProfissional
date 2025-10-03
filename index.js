require("dotenv").config();
const porta = process.env.PORTA;
const stringSQL = process.env.CONECTION_STRING;
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

})

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


app.use('/',(req,res) => res.json({mensagem: 'servidor em execusão'}) ) 
    
app.listen(porta, () => console.log("API funcionando!"))
