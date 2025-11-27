/*const url_compras = [
    {
        data: new Date().toLocaleString('pt-BR'),
        produto: "Banana",
        preco: 7.00,
        unidade: 1,
        quantidade: 1
    },

    {
        produto: "Maça",
        preco: 5.00,
        unidade: 1,
        quantidade: 1
    },

    {
        produto: "Laranja",
        preco: 6.00,
        unidade: 1,
        quantidade: 1
    },

    {
        produto: "Manga",
        preco: 4.00,
        unidade: 1,
        quantidade: 1
    },
];

const usuario = [
    {
        nome: "Enzzo",
        email: "enzzo@gmail.com",
        endereco: "Rua Alguma Coisa",
        telefone: "(11) 95339-6464",
    },
];
*/

/*const dias = [
    {
        semana: "Segunda",
        dia: "30/05/2025",
    },
];


function exibeData () {
    let data = "";
    for (let i = 0; i < dias.length; i++) {
        data += `<button id="botao-historico">Compra: ${dias[i].semana}, ${dias[i].dia}</button>`;
    }
    document.querySelector(".lista-pedidos").innerHTML = data;
}
exibeData();*/

const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

if (usuarioLogado != null){
    let info =""
    info += `<h1 id='texto'>${usuarioLogado.nome} Logado(a)</h1>`;
    info += `<img src="/Projeto Daroça/Da - Roça/img - daroça/usuario_sem_foto.png" alt="Usuario" id="cliente">`;
    info += `<div class="info-usuario"><br>`;
    info += `<ul>`;
    info += `<li class='info'> <p class='paragrafo'>Nome:<p/> ${usuarioLogado.nome}</li>`;
    info += `<li class="info"> <p class='paragrafo'>Email:</p> ${usuarioLogado.email}</li>`;
    info += `<li class="info"> <p class='paragrafo'>Endereço:</p> ${usuarioLogado.endereco}</li>`;
    info += `<li class="info"> <p class='paragrafo'>Telefone:</p> ${usuarioLogado.telefone}</li>`;
    info += `</ul>`;
    info += "</div>";
    document.getElementById("usuario").innerHTML = info;
}

////////////////

const urlProdutos = 'http://localhost:8081/historico/';
let email =usuarioLogado.email
fetch(urlProdutos+email)
.then(res => res.json())
.then(listaProdutos => {
    exibeCompras(listaProdutos.recordset);
})

function exibeCompras (listaProdutos) {
    console.log(listaProdutos)
    let compra = "";
    compra+='<table>'
    compra+="<tr><th>produto</th><th>descrição</th><th>quantidade</th><th>preço</th></tr>"
    for (let i = 0; i < listaProdutos.length; i++) {
        compra += `<tr>`;
        compra += `<td class="dados"><p>${listaProdutos[i].produtos}</p></td>`;
        compra += "</tr>";
    }
    compra+='</table>'
    document.querySelector(".card-historico").innerHTML = compra;
    console.log("Enviado")
};

