let card = JSON.parse(localStorage.getItem("card")) || [];
document.getElementById('tabela_de_produtos').innerHTML = card.join('');
console.log(card)
let total= localStorage.getItem("total")
console.log(total)
document.getElementById("total_a_paga").innerHTML=total


const fretes = {
    SP: 10.00,
    RJ: 15.00,
    MG: 12.00,
    RS: 18.00,
    PR: 14.00,
    SC: 16.00,
    BA: 20.00
  };
  
  // quando o select muda...
  document.getElementById("estado").addEventListener("change", function () {
    const estado = this.value;
    const frete = fretes[estado] || 0; // se não escolher nada, frete = 0
    document.getElementById("total_a_paga").innerHTML=total
    localStorage.setItem("frete",frete)
    
    // mostra o frete
    document.getElementById("frete").innerText = frete.toFixed(2);
  
    // pega o total base atual (do <p>)
    const totalBase = parseFloat(document.getElementById("total_a_paga").innerText) || 0;
  
    // soma total + frete
    const totalComFrete = totalBase + frete;

    // atualiza o total no HTML
    document.getElementById("total_a_paga").innerText = totalComFrete.toFixed(2);
    
  });
  