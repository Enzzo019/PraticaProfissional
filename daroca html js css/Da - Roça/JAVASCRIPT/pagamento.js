function pagamento_pix(){
    document.getElementById("forma_paga").innerHTML='<img src="/Da - Roça/img - daroça/pix.png" alt="" id="imagem_paga">'
    document.getElementById("forma_paga").style='background-color:white;'
}
function pagamento_boleto() {
    document.getElementById("forma_paga").innerHTML='<img src="/Da - Roça/img - daroça/boelto.png" alt="" id="imagem_boleto">'
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
let total= Number(localStorage.getItem("total"))
let frete= Number(localStorage.getItem("frete"))
console.log(total+frete)
document.getElementById("total_a_paga").innerHTML=total+frete