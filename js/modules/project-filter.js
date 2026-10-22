function initProjectFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");
  const grid = document.querySelector(".projects-grid");
  const showMoreButton = document.querySelector(".show-more-btn");
  const showMoreLabel = document.querySelector(".show-more-label");

  if (buttons.length === 0 || cards.length === 0 || !grid) return;

  let isExpanded = false;
  let currentFilter = "all";

  function animateIn(card) {
    // Cards que estavam escondidos aparecem na hora, sem esperar a animacao de rolagem
    card.classList.add("show");
    card.classList.remove("is-entering");
    // Forca o reflow para reiniciar a animacao de entrada
    void card.offsetWidth;
    card.classList.add("is-entering");
  }

  function applyFilter(filter) {
    currentFilter = filter;

    // Com filtro ativo mostra todos os resultados; em "Todos" respeita o "mostrar mais"
    const isShowingAll = filter === "all";
    grid.classList.toggle("is-collapsed", isShowingAll && !isExpanded);

    if (showMoreButton) {
      showMoreButton.hidden = !isShowingAll;
    }

    cards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const isVisible = isShowingAll || categories.includes(filter);

      card.classList.toggle("is-filtered-out", !isVisible);

      if (isVisible) {
        animateIn(card);
      }
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        const isActive = item === button;

        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      applyFilter(button.dataset.filter);
    });
  });

  if (showMoreButton) {
    showMoreButton.addEventListener("click", () => {
      isExpanded = !isExpanded;

      grid.classList.toggle("is-collapsed", !isExpanded);
      showMoreButton.setAttribute("aria-expanded", String(isExpanded));
      showMoreButton.classList.toggle("is-expanded", isExpanded);

      if (showMoreLabel) {
        showMoreLabel.textContent = isExpanded ? "Mostrar menos" : "Mostrar mais projetos";
      }

      if (isExpanded) {
        grid.querySelectorAll(".is-extra").forEach(animateIn);
      } else if (currentFilter === "all") {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}
