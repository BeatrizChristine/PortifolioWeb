function initContact() {
  const copyButton = document.querySelector(".copy-email");
  const yearElement = document.querySelector(".current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (!copyButton || !navigator.clipboard) return;

  let resetTimeout = null;

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
    } catch (error) {
      return;
    }

    copyButton.classList.add("is-copied");
    copyButton.setAttribute("aria-label", "E-mail copiado");

    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
      copyButton.classList.remove("is-copied");
      copyButton.setAttribute("aria-label", "Copiar e-mail");
    }, 2000);
  });
}
