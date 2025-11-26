const urlProdutos = 'http://localhost:8081/produtos';
const urlCategorias = 'http://localhost:8081/categorias';


let listaProdutos = [];

fetch(urlProdutos)
.then(res => res.json())
.then(data => {
    listaProdutos = data.recordset; 
    exibeDados(listaProdutos);      
})
fetch(urlCategorias)
    .then(res => res.json())
    .then(data => {
        montaSelect(data.recordset);
    })



function exibeDados(listaProdutos) { 
    
    let card = "";
    for (let i = 0; i < listaProdutos.length; i++) {
        card += '<div class="card-produtos">';
        card += `<img src="/Da - Roça/${listaProdutos[i].imagem}" alt="${listaProdutos[i].descricao}">`;
        card += `<h3>${listaProdutos[i].nome}</h3>`;
        card += "<p>Unidade: kg</p>";
        card+=`<p id="quantidade">Unidade:<input type="number" id="${i}" value="1" min="1" max="99"></p>`
        card+=`<p>Preço: R$${listaProdutos[i].valor}</p>`
        card+=`<button onclick="Adiciona_produto(${listaProdutos[i].id},${i})">Adicionar</button>`
        card+=`</div>`;
    }  
    limpa()
    document.getElementById("corpo").innerHTML = card;
    document.getElementById("barra_de_pesquisa").innerHTML="";
}

function montaSelect(listaCategorias) {
    let selectHTML = '<select id="categorias">';
    selectHTML += `<option value="0">Todas as categorias</option>`; 
    for (let i = 0; i < listaCategorias.length; i++) {
        selectHTML += `<option value="${listaCategorias[i].id}">${listaCategorias[i].nome}</option>`;
    }
    selectHTML += '</select>';
    
    
    document.getElementById("pesquisa").innerHTML = selectHTML;

    document.getElementById("categorias").addEventListener("change", function() {
        const categoriaId = parseInt(this.value);
        if (categoriaId === 0) {
            exibeDados(listaProdutos);  
        } else {
            const filtrados = listaProdutos.filter(p => p.categoria === categoriaId);
            exibeDados(filtrados);
        }
    });
}


function busca() {
    let escolha = document.getElementById("barra_de_pesquisa").value;

    const urlnome_produto  = 'http://localhost:8081/produtos/';
    fetch(urlnome_produto + escolha)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Erro na requisição');
            }
            return resp.json();
        })
        .then(NomeDigitado=>{
            console.log(NomeDigitado.recordset)
            pornome(NomeDigitado.recordset,escolha) 
        })

}
function limpa() {
    document.getElementById("barra_de_pesquisa").value="";

}
function pornome(NomeDigitado,escolha) {
    if (NomeDigitado!=null) {
        
    
        let card = ''
        for (let i = 0; i < NomeDigitado.length; i++) {
            let quantidade=i
            if (NomeDigitado[i].nome.toUpperCase() == escolha.toUpperCase()) {
                card+=`<div class="card-produtos">`
                card+=`<img src="/Da - Roça/${NomeDigitado[i].imagem}" alt="${NomeDigitado[i].descricao}">`
                card+=`<h3>${NomeDigitado[i].nome}</h3>`
                card+=`<p id="quantidade">Unidade:<input type="number" id="quantidades" value="1" min="1" max="99"></p>`
                card+=`<p>Preço:R$${NomeDigitado[i].valor}</p>`
                card+=`<button onclick="Adiciona_produto(${NomeDigitado[i].id},${quantidade})">Adicionar</button>`
                card+=`</div>`;
                limpa()
                return document.getElementById("corpo").innerHTML = card;
                
            }
        } 
    }    
        document.getElementById("corpo").innerHTML = "<p>Produto não encontrado</p>";
        limpa()
    
}  


window.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.nome) {
        document.getElementById("cadastrado").textContent = usuario.nome;
    }
    })
let url_joga='http://localhost:8081/prod/'  
function Adiciona_produto(NomeDigitado,quantidade) {
    const usuario = localStorage.getItem("usuario");

    if (usuario && usuario !== "")  {
        let quanto=document.getElementById(quantidade).value;
        console.log(NomeDigitado,quanto)
        fetch(url_joga+NomeDigitado)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Erro na requisição');
                }
                return resp.json();
            })
            .then(dados=>{
                monta_tabela(dados.recordset,quanto)
            })
    }
    else{
        document.getElementById("corpo").innerHTML = '<a href="/Da - Roça/HTML/cadastro-cliente.html"  class="menu" id="cadastroentrar"><button>Faça login em uma conta</button></a>';
    }

} 
let produto_adicionado = JSON.parse(localStorage.getItem("card")) || [];

function monta_tabela(dados, quanto) {
    if (!dados || dados.length === 0) return;

    let conta = dados[0].valor * quanto;
    if (produto_adicionado.length===0) {
        produto_adicionado.push(`<tr><th>produto</th><th>descrição</th><th>quantidade</th><th>preço</th></tr>`)
    }
    let total = (Number(localStorage.getItem("total")) || 0) + conta;
    localStorage.setItem("total", total);
    console.log(total);

    produto_adicionado.push(`<tr><td><img src='/Da - Roça/${dados[0].imagem}' class="imagem_pedido"></td>    <td><p>${dados[0].descricao}</p></td>   <td>${quanto}</td>   <td>${conta}</td></tr>`);
    localStorage.setItem("card", JSON.stringify(produto_adicionado));
    window.location.href = "/Da - Roça/HTML/pedidos.html";
}

