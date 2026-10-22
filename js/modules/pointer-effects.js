function initPointerEffects() {
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!hasFinePointer || prefersReducedMotion) return;

  createBackgroundSpotlight();
  createCardTilt(document.querySelectorAll(".project-card"));
}

// Luz suave do fundo que acompanha o cursor
function createBackgroundSpotlight() {
  const spotlight = document.querySelector(".bg-spotlight");

  if (!spotlight) return;

  let pointerX = 0;
  let pointerY = 0;
  let frame = null;

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    if (frame !== null) return;

    frame = requestAnimationFrame(() => {
      // Move por transform: so recompoe a camada, sem redesenhar o fundo
      spotlight.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      frame = null;
    });
  }, { passive: true });
}

// Inclinacao 3D leve nos cards de projeto
function createCardTilt(cards) {
  const maxTilt = 6;

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      card.style.setProperty("--rx", `${(0.5 - y) * maxTilt}deg`);
      card.style.setProperty("--ry", `${(x - 0.5) * maxTilt}deg`);
      card.style.setProperty("--gx", `${x * 100}%`);
      card.style.setProperty("--gy", `${y * 100}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}
