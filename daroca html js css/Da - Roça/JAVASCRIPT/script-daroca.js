const url_dados_usuario = "http://localhost:8081/cadastro";

let ListaDados = [];

fetch (url_dados_usuario) 
    .then(res => res.json())
    .then(dados => {
        ListaDados = dados;
        ExibirDados(ListaDados);
    });


function ExibirDados() {
    let user = "";

    document.querySelector(".opcoes-usuario").innerHTML = "";   // Limpa 

    if (!ListaDados || ListaDados.length === 0) {   // Se não for encontrado nenhum usuário
        alert("Usuário não encontrado!");
    }

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));  // Guarda o usuário logado

    console.log("alerta")
   for (let i = 0; i < ListaDados.length; i++) {

        if (usuarioLogado && ListaDados[i].email != usuarioLogado.email) {  // Filtragem para pegar só o usuário que logou ou estiver logado
            continue;
        }


        user += `<h1>Olá, ${ListaDados[i].nome}!</h1>`;
        user += "<a href='/Da - Roça/HTML/comentario.html'>Chat</a>";
        user += "<a href='/Da - Roça/HTML/compras.html'>Pedidos</a>";
        user += `<a href='./Da - Roça/HTML/cadastro-cliente.html'>Dados</a>`;
        break
    }
    document.querySelector(".opcoes-usuario").innerHTML = user;
}


/*window.addEventListener("DOMContentLoaded", () => {
    localStorage.clear();
});

*/

window.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.nome) {
        document.getElementById("cadastrado").textContent = usuario.nome;
        document.getElementById("cadastroentrar").innerHTML= "perfil"
    }
    else{
        document.getElementById("cadastroentrar").innerHTML= "cadastro/entrar"
    }
    })
    


const btnCompras = document.getElementById("usuario");
const opcoesCompras = document.querySelector(".opcoes-usuario");

btnCompras.addEventListener('click', (event) => {
    event.preventDefault();
    opcoesCompras.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!btnCompras.contains(e.target) && !opcoesCompras.contains(e.target)) {
        opcoesCompras.classList.remove('active');
    }
});
