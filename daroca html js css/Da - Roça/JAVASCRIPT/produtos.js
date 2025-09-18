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
        card += `<p>Preço: R$${listaProdutos[i].valor}</p>`;
        card += '<button>Adicionar</button>';
        card += '</div>';
    }
    document.getElementById("corpo").innerHTML = card;
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
 