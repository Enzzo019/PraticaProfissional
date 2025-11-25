const faqItems = document.querySelectorAll(".pergunta-item");

faqItems.forEach(item => {
    const question = item.querySelector(".pergunta-question");
    question.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});
