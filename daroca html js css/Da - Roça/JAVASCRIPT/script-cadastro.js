

/*| Linha                           | O que faz                         |
| --------------------------------- | --------------------------------- |
| `window.addEventListener...`      | Espera o HTML carregar            |
| `localStorage.getItem("usuario")` | Pega o usuário salvo              |
| `if (usuario)`                    | Verifica se alguém está logado    |
| `innerHTML = ...`                 | Mostra as informações na tela     |
| `addEventListener("click")`       | Faz o botão “Sair” apagar o login |
*/
const url = "http://localhost:8081/cadastro";
window.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
        document.getElementById("fundo").innerHTML = `
            <h1>Bem-vindo, ${usuario.nome}!</h1>
            <p>Endereço: ${usuario.endereco}</p>
            <p>Email: ${usuario.email}</p>
            <p>Telefone: ${usuario.telefone}</p>
            <button id="sair"  onclick="limpalocal()">Sair</button>
        `;

        document.getElementById("sair").addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.reload();
        });
    }
});
function limpalocal() {
    localStorage.clear()
}

function MandaDados() {
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let senha = document.getElementById("senha").value;

    if (!nome) return alert("Digite o nome!");
    if (!nome) return alert("Digite o endereço!");
    if (!email.includes("@")) return alert("Email Inválido!");
    if (!telefone.length < 9) return alert("Telefone Inválido!");
    if (!senha.lenght < 6) return alert("Senha Inválida!");

    let opcoes = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ nome, endereco, email, telefone, senha })
    };

    fetch(url, opcoes)
        .then(dados => dados.json())
        .then(resposta => {
            if (resposta.sucesso) {
                console.log(resposta)
            }else {
                alert("Erro no cadastro: " + resposta.mensagem);
            }
            exibepost(resposta.email)

        })
        .catch(erro => {
            console.error("Erro ao cadastrar:", erro);
            alert("Erro no servidor, tente novamente mais tarde.");
        });

}
function exibepost(dados){
    document.getElementById("erro").innerHTML = "";
    const urlnome_produto  = 'http://localhost:8081/cadastro/';
    fetch(urlnome_produto + dados)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Erro na requisição');
            }
            return resp.json();
        })
        .then(NomeDigitado=>{
            console.log(NomeDigitado.recordset)
            post_foi(NomeDigitado.recordset) 
        })
   
}
function post_foi(NomeDigitado) {
    // salva o nome do usuário no navegador
    localStorage.setItem("usuario", JSON.stringify(NomeDigitado[0]));

    // mostra o nome no menu (se quiser ver antes de redirecionar)
    document.getElementById("cadastrado").innerHTML = NomeDigitado[0].nome;

    // redireciona para a página principal
    window.location.href = "/Da - Roça/HTML/daroca.html";
    
}

function logar() {
    document.getElementById("erro").innerHTML = "";
    const urlnome_produto  = 'http://localhost:8081/cadastro/';
    let login_email = document.getElementById("login-email").value;
    let senhas = document.getElementById("login-senha").value;

    if (!login_email) return alert("Digite o email!");
    if (!senhas) return alert("Digite a senha!");
    if (!login_email.includes("@")) return alert("Email de Usuário Inválido!");

    fetch(urlnome_produto + login_email)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Erro na requisição');
            }
            return resp.json();
        })
        .then(NomeDigitado=>{
            console.log(NomeDigitado.recordset)
            senha(NomeDigitado.recordset,login_email,senhas) 
        })
        

}

function senha(NomeDigitado,login_email,senhas) {
    
    console.log(NomeDigitado)
    for (let i = 0; i < NomeDigitado.length; i++) {
        
        if (NomeDigitado[i].email.toUpperCase() == login_email.toUpperCase() && NomeDigitado[i].senha == senhas) {
                // salva o nome do usuário no navegador
            localStorage.setItem("usuario", JSON.stringify(NomeDigitado[i]));

            // mostra o nome no menu (se quiser ver antes de redirecionar)
            document.getElementById("cadastrado").innerHTML = NomeDigitado[i].nome;

            // redireciona para a página principal
            window.location.href = "/Da - Roça/HTML/daroca.html";
            return;
        }


    } 
    document.getElementById("erro").innerHTML = "<p>Conta não encontrado</p>";
    limpa()
} 
function limpa() {
    document.getElementById("login-email").value="";
    document.getElementById("login-senha").value="";
}
