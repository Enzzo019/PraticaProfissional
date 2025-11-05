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
const url_usuario = "http://localhost:8081/cadastro";

let ListaDados = [];

fetch(url_usuario)
.then(res => res.json())
.then(data => {
    ListaDados = data; 
    exibeDados(ListaDados);      
})



if (!ListaDados || ListaDados.length === 0) {
    alert("Usuário não encontrado, por favor logue!");
    document.getElementById("usuario").innerHTML = "";
    document.querySelector(".card-historico").innerHTML = "";
};

function exibeDados () {
    let info ="";
    for (let i = 0; i < ListaDados.length; i++) {
        info += `<p id='para'> Usuario não encontrado</p>`;
        info += `<h1 id='texto'>${ListaDados[i].nome} Logado</h1>`;
        info += `<img src="/Da - Roça/img - daroça/usuario sem foto.jpg" alt="Usuario" id="cliente">`;
        info += `<div class="info-usuario"><br>`;
        info += `<ul>`;
        info += `<li class='info'> <p class='paragrafo'>Nome:<p/> ${ListaDados[i].nome}</li>`;
        info += `<li class="info"> <p class='paragrafo'>Email:</p> ${ListaDados[i].email}</li>`;
        info += `<li class="info"> <p class='paragrafo'>Endereço:</p> ${ListaDados[i].endereco}</li>`;
        info += `<li class="info"> <p class='paragrafo'>Telefone:</p> ${ListaDados[i].telefone}</li>`;
        info += `</ul>`;
        info += "</div>";
    }
    document.getElementById("usuario").innerHTML = info;
};
exibeDados();


////////////////

const urlProdutos = 'http://localhost:8081/produtos';


let listaProdutos = [];

fetch(urlProdutos)
.then(res => res.json())
.then(data => {
    listaProdutos = data; 
    exibeCompras(listaProdutos);      
})

function exibeCompras () {
    let compra = "";



    for (let i = 0; i < listaProdutos.length; i++) {
        compra += "<br>";
        compra += `<ul>`;
        compra += `<li class="dados"> <p>Mercadoria: ${listaProdutos[i].produto}</p></li>`;
        compra += `<li class="dados"> <p>Preço: ${listaProdutos[i].preco}</p></li>`;
        compra += `<li class="dados"> <p>Unidade: ${listaProdutos[i].unidade} kg</p></li>`;
        compra += `<li class="dados"> <p>Quantidade: ${listaProdutos[i].quantidade}</p></li>`;
        compra += "</ul>";
    }
    document.querySelector(".card-historico").innerHTML = compra;
    console.log("Enviado")
};
console.log("Está na Função")
exibeCompras();