function initRevealAnimations() {
  const hiddenElements = document.querySelectorAll(
    ".home-text, .home-img, .about-img, .about-text, .project-card, .skills, .certificates, .contact"
  );

  if (hiddenElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px"
  });

  hiddenElements.forEach((element) => {
    element.classList.add("hidden");
    observer.observe(element);
  });
}
