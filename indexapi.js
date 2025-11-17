require("dotenv").config();
const porta = process.env.PORTA;
const express = require("express");
const app = express();
const mssql = require("mssql");
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "*" }));

// 💡 Configuração da conexão segura com o BD
const config = {
    connectionString: process.env.CONNECTION_STRING,
    options: {
        encrypt: true,
        trustServerCertificate: true // 🔥 ignora o certificado autoassinado
    }
};

// 🔗 Função de conexão com o BD
async function conectaBD() {
    try {
        await mssql.connect(config);
        console.log("✅ Conectado ao BD com sucesso!");
    } catch (error) {
        console.log("❌ Erro na conexão com o BD:", error);
    }
}
conectaBD();

// 🛒 Rotas da API
app.get('/produtos', async (req, res) => {
    const produtos = await mssql.query("SELECT * FROM daroca.produto");
    res.json(produtos);
});

app.get('/categorias', async (req, res) => {
    const categorias = await mssql.query("SELECT * FROM daroca.categorias");
    res.json(categorias);
});

app.post('/cadastro', async (req, res) => {
    try {
        const { nome, endereco, email, telefone, senha } = req.body;
        if (!nome || !endereco || !email || !telefone || !senha) {
            return res.json({ sucesso: false, mensagem: "Preencha todos os campos!" });
        };
        if (!email.includes("@")) {
            return res.json({ sucesso: false, mensagem: "Email inválido!" });
        };
        if (senha.length < 6) {
            return res.json({ sucesso: false, mensagem: "A senha deve ter pelo menos 6 caracteres!" });
        };

        // Verificar se email já existe no banco
        const verificaEmail = await mssql.query(`
            SELECT email FROM daroca.Clientes WHERE email = '${email}'
        `);

        if (verificaEmail.recordset.length > 0) {
            return res.json({ sucesso: false, mensagem: "Email já cadastrado!" });
        };
        await mssql.query(`
            INSERT INTO daroca.Clientes (nome, endereco, email, telefone, senha)
            VALUES (
                '${nome.replace("'", "''")}',
                '${endereco.replace("'", "''")}',
                '${email.replace("'", "''")}',
                '${telefone.replace("'", "''")}',
                '${senha.replace("'", "''")}'
            )
        `);

        res.status(201).json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso", email });

    } catch (erro) {
        console.log("Erro na inserção de dados:", erro);
        res.json({ sucesso: false, mensagem: "Erro interno do servidor" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.json({ sucesso: false, mensagem: "Email e senha são obrigatórios!" });
        }

        const busca = await mssql.query(`
            SELECT * FROM daroca.Clientes 
            WHERE email = '${email}' and senha = '${senha}'
        `);

        if (busca.recordset.length === 0) {
            return res.json({ sucesso: false, mensagem: "Email ou senha incorretos!" });
        }

        const usuario = busca.recordset[0];
        res.json({ sucesso: true, usuario });

    } catch (erro) {
        res.json({ sucesso: false, mensagem: "Erro no servidor" });
    }
});

app.get('/produtos/:nome', async (req, res) => {
    const nome = req.params.nome;
    const produto = await mssql.query(`SELECT * FROM daroca.produto WHERE nome='${nome}'`);
    res.json(produto);
});

app.get('/cadastro/:email', async (req, res) => {
    const email = req.params.email;
    const cliente = await mssql.query(`SELECT * FROM daroca.Clientes WHERE email='${email}'`);
    res.json(cliente);
});

app.get('/prod/:id', async (req, res) => {
    const id = req.params.id;
    const produto = await mssql.query(`SELECT * FROM daroca.produto WHERE id='${id}'`);
    res.json(produto);
});

// 🔥 Rota padrão
app.use('/', (req, res) => res.json({ mensagem: 'Servidor em execução' }));

// 🚀 Inicializa servidor
app.listen(porta, () => console.log(`API funcionando na porta ${porta}!`));

