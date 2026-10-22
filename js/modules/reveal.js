function initRevealAnimations() {
  const hiddenElements = document.querySelectorAll(
    ".home-text, .home-img, .about-img, .about-text, .section-header, .project-filters, " +
    ".job-card, .timeline-item, .project-card, .skills-ide, .degree-card, .certs-header, .cert-card, " +
    ".contact-intro, .contact-row"
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
    // Cards irmaos entram em cascata
    const siblings = Array.from(element.parentElement.children);
    const position = siblings.indexOf(element);

    element.style.setProperty("--reveal-delay", `${Math.min(position, 5) * 0.07}s`);
    element.classList.add("hidden");
    observer.observe(element);
  });
}
