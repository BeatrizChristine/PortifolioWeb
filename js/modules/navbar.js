function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuLinks = document.querySelectorAll(".nav-menu a");

  if (!navbar) return;

  function setMenuOpen(isOpen) {
    navbar.classList.toggle("menu-open", isOpen);

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      setMenuOpen(!navbar.classList.contains("menu-open"));
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!navbar.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  // Destaca a navbar depois que a pagina comeca a rolar
  let scrollTicking = false;

  function updateScrolledState() {
    navbar.classList.toggle("is-scrolled", window.scrollY > 24);
    scrollTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (scrollTicking) return;

    scrollTicking = true;
    requestAnimationFrame(updateScrolledState);
  }, { passive: true });

  updateScrolledState();
}
