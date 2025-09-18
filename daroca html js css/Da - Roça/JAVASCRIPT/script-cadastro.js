const url = "http://localhost:8081/cadastro";

fetch (url)
    .then(dados => dados.json())
    .then(resposta => console.log(resposta))

function MandaDados(){
    let nome = document.getElementById("nome").value;
    let endereco = document.getElementById("endereco").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let senha = document.getElementById("senha").value;

    let user = {
    nome: "João",
    endereco: "Rua Piracicaba",
    email: "joao@gmail.com",
    telefone: 111111111, // sem o DDD
    senha: "joao1234"
    }
    let opcoes = {
        method: "POST",
        headers: {"Content-type": "application/json"},      
        body: JSON.stringify({
            "nome": nome,
            "endereco": endereco,
            "email": email,
            "telefone": telefone,
            "senha": senha
    })
    }
fetch (url, opcoes)
    .then(dados => dados.json())
    .then(resposta => console.log(resposta))

}