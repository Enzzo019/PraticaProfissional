function EnviarMensagem(event) {
    event.preventDefault();
    const mensagem = document.querySelector(".form-input").value.trim();
    if (mensagem === "") {
        alert("Por favor, escreva sua mensagem antes de enviar!");
        return;
    }

    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    
    if (usuarioLogado == null) {
        alert("Você precisa estar logado para enviar uma mensagem!");
        return;
    }
    const usuario_email = usuarioLogado.email;
     const urlcomentarios = "http://localhost:8081/comentarios";
     let opcoes = {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({mensagem,usuario_email})
     };

    fetch(urlcomentarios, opcoes)
        .then(dados => dados.json())
        .then(res => {
            console.log(opcoes)
            console.log(" Resposta da API:", res);
            alert("Mensagem enviada com sucesso!");
        })
        .catch(erro => {
            console.error("Erro:", erro);
            alert("Ocorreu um erro ao enviar sua mensagem!");
        });
}
