function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar a");

  if (sections.length === 0 || navLinks.length === 0) return;

  let clickedSection = null;
  let activeLinkTicking = false;
  let sectionPositions = [];

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }

  function updateSectionPositions() {
    sectionPositions = Array.from(sections).map((section) => ({
      id: section.getAttribute("id"),
      top: section.offsetTop
    }));
  }

  function updateActiveLinkOnScroll() {
    if (clickedSection) return;

    const pageBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;

    if (pageBottom) {
      setActiveLink("contact");
      return;
    }

    const activationPoint = window.scrollY + window.innerHeight * 0.42;
    let current = "home";

    sectionPositions.forEach((section) => {
      if (activationPoint >= section.top) {
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

      clickedSection = id;
      setActiveLink(id);

      setTimeout(() => {
        clickedSection = null;
        updateActiveLinkOnScroll();
      }, 900);
    });
  });

  updateSectionPositions();
  setActiveLink(window.location.hash.replace("#", "") || "home");

  window.addEventListener("scroll", requestActiveLinkUpdate, { passive: true });
  window.addEventListener("resize", () => {
    updateSectionPositions();
    requestActiveLinkUpdate();
  });
  window.addEventListener("load", () => {
    updateSectionPositions();
    requestActiveLinkUpdate();
  });
}
