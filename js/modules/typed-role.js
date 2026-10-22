function initTypedRole() {
  const element = document.querySelector(".typed-role");

  if (!element) return;

  let words = [];

  try {
    words = JSON.parse(element.dataset.words || "[]");
  } catch (error) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (words.length < 2 || prefersReducedMotion) return;

  const typeDelay = 70;
  const deleteDelay = 35;
  const holdDelay = 1800;

  let wordIndex = 0;
  let charIndex = words[0].length;
  let isDeleting = true;

  function tick() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    element.textContent = currentWord.slice(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(tick, holdDelay);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(tick, isDeleting ? deleteDelay : typeDelay);
  }

  setTimeout(tick, holdDelay);
}
