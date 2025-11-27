function pagamento_pix(){
    document.getElementById("forma_paga").innerHTML='<img src="/Projeto Daroça/Da - Roça/img - daroça/pix.png" alt="" id="imagem_paga">'
    document.getElementById("forma_paga").style='background-color:white;'
}
function pagamento_boleto() {
    document.getElementById("forma_paga").innerHTML='<img src="/Projeto Daroça/Da - Roça/img - daroça/boelto.png" alt="" id="imagem_boleto">'
    document.getElementById("forma_paga").style='background-color:white;'

}
function pagamento_cartao() {
    let card=''
    card+='  <form class="cartao-form" id="formCartao" action="/processar-pagamento" method="POST"><h2>Pagamento com Cartão</h2>'
    card+='<label for="nome">Nome no cartão</label>'
    card+='<input type="text" id="nome" name="nome" placeholder="Nome completo" required>'
    card+='<label for="numero">Número do cartão</label>'
    card+='<input type="text" id="numero" name="numero" placeholder="0000 0000 0000 0000" maxlength="19" required>'

    card+='<label for="validade">Validade</label>'
    card+='<input type="text" id="validade" name="validade" placeholder="MM/AA" maxlength="5" required>'

    card+='<label for="cvv">CVV</label>'
    card+='<input type="text" id="cvv" name="cvv" placeholder="123" maxlength="4" required>'

    card+='<label for="parcelas">Parcelas</label>'
    card+='<select id="parcelas" name="parcelas" required>'
    card+='<option value="">Selecione</option><option value="1">1x</option><option value="2">2x</option><option value="3">3x</option>'
    card+='<option value="4">4x</option><option value="5">5x</option><option value="6">6x</option></select>'
    document.getElementById("forma_paga").innerHTML=card

}
let total= localStorage.getItem("total")

document.getElementById("total_a_paga").innerHTML=total
const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
const url_comprado=`http://localhost:8081/comprado`


function comprado() {
    let numero_compra = usuarioLogado.nova_coluna;
    let email = usuarioLogado.email;

    let card = JSON.parse(localStorage.getItem("card")) || [];
    let produtos = card.slice(1);

    let opcoes = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ numero_compra, email, produtos })
    };

    fetch(url_comprado, opcoes)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(erro => console.log("Erro:", erro));

        localStorage.removeItem("card");
        window.location.href = "/Projeto Daroça/Da - Roça/HTML/daroca.html";


}

