const url_dados_usuario = "http://localhost:8081/logados/";

const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
let email = usuarioLogado.email
fetch (url_dados_usuario+email)
    .then(res => res.json())
    .then(ListaDados => {
        ExibirDados(ListaDados.recordset);
    });

function ExibirDados(ListaDados) {
    console.log(ListaDados)
    document.querySelector(".opcoes-usuario").innerHTML = "";   // Limpa

    if (!ListaDados || ListaDados.length === 0) {   // Se não for encontrado nenhum usuário
        alert("Usuário não encontrado!");
    }

  // Guarda o usuário logado
    for (let i = 0; i < ListaDados.length; i++) {
        console.log(ListaDados[i].nome)
        if (usuarioLogado===null) {
          document.querySelector(".opcoes-usuario").innerHTML="<p>login</p>";
          break
        }
        if (usuarioLogado.nome === ListaDados[i].nome) {  // Filtragem para pegar só o usuário que logou ou estiver logado
          let user = "";
          user += `<h1>Olá, ${ListaDados[i].nome}!</h1>`;
          user += "<a href='/Da - Roça/HTML/comentario.html'>Chat</a>";
          user += "<a href='/Da - Roça/HTML/compras.html'>Pedidos</a>";
          user += "<a href='./Da - Roça/HTML/cadastro-cliente.html'>Dados</a>";
          document.querySelector(".opcoes-usuario").innerHTML = user;
          console.log(user)
        }
    }

}

/*window.addEventListener("DOMContentLoaded", () => {
    localStorage.clear();
});

*/

window.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.nome) {
        document.getElementById("cadastrado").textContent = usuario.nome;
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