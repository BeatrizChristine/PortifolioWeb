function initCarousels() {
  createCarousel({
    containerSelector: ".projects-container",
    cardSelector: ".project-card",
    leftArrowSelector: ".projects .arrow.left",
    rightArrowSelector: ".projects .arrow.right",
    sectionSelector: "#projects",
    viewportSelector: ".projects-viewport"
  });

  createCarousel({
    containerSelector: ".certificates-container",
    cardSelector: ".certificate-card",
    leftArrowSelector: ".cert-left",
    rightArrowSelector: ".cert-right",
    sectionSelector: "#certificates",
    viewportSelector: ".certificates-viewport"
  });
}

function createCarousel({
  containerSelector,
  cardSelector,
  leftArrowSelector,
  rightArrowSelector,
  sectionSelector,
  viewportSelector
}) {
  const container = document.querySelector(containerSelector);
  const cards = document.querySelectorAll(cardSelector);
  const leftArrow = document.querySelector(leftArrowSelector);
  const rightArrow = document.querySelector(rightArrowSelector);
  const section = document.querySelector(sectionSelector);
  const viewport = document.querySelector(viewportSelector);

  if (!container || cards.length === 0 || !leftArrow || !rightArrow) return;

  let currentIndex = 0;
  let wheelScrollLocked = false;

  function getVisibleCards() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCards());
  }

  function updateCarousel() {
    const gap = 24;
    const cardWidth = cards[0].offsetWidth + gap;

    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function next() {
    const maxIndex = getMaxIndex();

    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  function isSectionVisible() {
    if (!section) return false;

    const rect = section.getBoundingClientRect();

    return rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
  }

  function handleWheel(event) {
    const scrollDistance = event.shiftKey ? event.deltaY : event.deltaX;
    const isHorizontalScroll =
      event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY);

    if (!isHorizontalScroll || wheelScrollLocked) return;

    const maxIndex = getMaxIndex();
    const canScrollRight = scrollDistance > 0 && currentIndex < maxIndex;
    const canScrollLeft = scrollDistance < 0 && currentIndex > 0;

    if (!canScrollRight && !canScrollLeft) return;

    event.preventDefault();
    wheelScrollLocked = true;

    if (canScrollRight) {
      next();
    } else {
      prev();
    }

    setTimeout(() => {
      wheelScrollLocked = false;
    }, 450);
  }

  function handleKeyboard(event) {
    if (!isSectionVisible()) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  }

  function handleResize() {
    const maxIndex = getMaxIndex();

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    updateCarousel();
  }

  rightArrow.addEventListener("click", next);
  leftArrow.addEventListener("click", prev);
  window.addEventListener("keydown", handleKeyboard);
  window.addEventListener("resize", handleResize);

  if (viewport) {
    viewport.setAttribute("tabindex", "0");
    viewport.addEventListener("wheel", handleWheel, { passive: false });
  }
}
