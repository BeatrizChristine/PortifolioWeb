function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar a");

  if (sections.length === 0 || navLinks.length === 0) return;

  let activeLinkTicking = false;

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }

  function updateActiveLinkOnScroll() {
    const pageBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;

    if (pageBottom) {
      setActiveLink("contact");
      return;
    }

    const activationPoint = window.innerHeight * 0.35;
    let current = "home";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= activationPoint) {
        current = section.id;
      }
    });

    setActiveLink(current);
  }

  function requestActiveLinkUpdate() {
    if (activeLinkTicking) return;

    activeLinkTicking = true;

    requestAnimationFrame(() => {
      updateActiveLinkOnScroll();
      activeLinkTicking = false;
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href").replace("#", "");

      link.blur();
      setActiveLink(id);
      requestActiveLinkUpdate();
    });
  });

  setActiveLink(window.location.hash.replace("#", "") || "home");

  window.addEventListener("scroll", requestActiveLinkUpdate, { passive: true });
  window.addEventListener("resize", requestActiveLinkUpdate);
  window.addEventListener("load", requestActiveLinkUpdate);
}
