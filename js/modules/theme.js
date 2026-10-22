function initTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  if (!toggle) return;

  function applyTheme(theme) {
    if (theme === "light") {
      root.dataset.theme = "light";
    } else {
      delete root.dataset.theme;
    }

    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", theme === "light" ? "#fbf8fc" : "#0b0510");
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      // Sem localStorage (aba privada, por exemplo): o tema vale so para esta visita
    }
  }

  applyTheme(root.dataset.theme === "light" ? "light" : "dark");

  toggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";

    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}
