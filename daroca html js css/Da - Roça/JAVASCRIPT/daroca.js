window.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.nome) {
        document.getElementById("cadastrado").textContent = usuario.nome;
    }
    })