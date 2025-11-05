function EnviarMensagem(event) {
    event.preventDefault();
    const mensagem = document.querySelector(".form-input").value.trim();
    if (mensagem === "") {
        alert("Por favor, escreva sua mensagem antes de enviar!");
        return;
    }
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!usuario || !token) {
        alert("Você precisa estar logado para enviar uma mensagem!");
        return;
    }
    const dados = {
        mensagem: mensagem,
        dataEnvio: new Date().toISOString(),
        status: "Novo",
        usuario: usuario.nome
    };

    fetch("http://localhost:8081/comentarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(dados)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro ao enviar mensagem");
        }
        return res.json();
    })
    .then(res => {
        console.log(" Resposta da API:", res);
        alert("Mensagem enviada com sucesso!");
        document.querySelector(".form-input").value = "";
        buscarComentarios(); 
    })
    .catch(erro => {
        console.error("Erro:", erro);
        alert("Ocorreu um erro ao enviar sua mensagem!");
    });
}

function buscarComentarios() {
    fetch("http://localhost:8081/comentarios")
        .then(res => res.json())
        .then(comentarios => {
            const lista = document.getElementById("lista-comentarios");
            if (!lista) return;

            lista.innerHTML = "";
            comentarios.forEach(c => {
                const item = document.createElement("div");
                item.classList.add("comentario");
                item.innerHTML = `
                    <p><strong>${c.usuario}</strong> - ${new Date(c.dataEnvio).toLocaleString()}</p>
                    <p>${c.mensagem}</p>
                    <hr>
                `;
                lista.appendChild(item);
            });
        })
        .catch(err => console.error("Erro ao buscar comentários:", err));
}
window.addEventListener("DOMContentLoaded", buscarComentarios);
