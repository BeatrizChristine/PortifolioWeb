// Vira os cards de certificado no toque (celular) e pelo teclado
function initCertificates() {
  const cards = document.querySelectorAll(".cert-card");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;

      card.classList.toggle("is-flipped");
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("is-flipped");
      }
    });
  });
}
