/* ============================= */
/* MENU ATIVO AO CLICAR E ROLAR */
/* ============================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

let clickedSection = null;
let activeLinkTicking = false;
let sectionPositions = [];

function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${id}`) {
      link.classList.add("active");
    }
  });
}

function updateActiveLinkOnScroll() {
  if (clickedSection) return;

  const pageBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 8;

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

function updateSectionPositions() {
  sectionPositions = Array.from(sections).map((section) => ({
    id: section.getAttribute("id"),
    top: section.offsetTop
  }));
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

/* ============================= */
/* HOME 3D INTERATIVO */
/* ============================= */
const heroCard = document.querySelector(".hero-card");
const devSymbol = document.querySelector(".dev-symbol-3d");

if (heroCard && devSymbol) {
  let tiltX = 0;
  let tiltY = 0;
  let spinZ = 0;
  let velocityX = 0;
  let velocityY = 0;
  let velocityZ = 0;
  let lastX = 0;
  let lastY = 0;
  let isPointerInside = false;
  let isPressing = false;
  let settleTimeout = null;
  let isReturningHome = false;
  let heroAnimationFrame = null;
  let returnStartTime = 0;
  let returnFromX = 0;
  let returnFromY = 0;
  let returnFromSpin = 0;
  let returnToSpin = 0;
  const returnDuration = 1200;

  function easeInOutCubic(progress) {
    if (progress < 0.5) {
      return 4 * progress * progress * progress;
    }

    return 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }

  function startReturnHome() {
    isReturningHome = true;
    returnStartTime = performance.now();
    returnFromX = tiltX;
    returnFromY = tiltY;
    returnFromSpin = spinZ;
    returnToSpin = Math.round(spinZ / 360) * 360;
    velocityX = 0;
    velocityY = 0;
    velocityZ = 0;
    scheduleHeroTransform();
  }

  function hasHeroMotion() {
    return (
      isPressing ||
      isReturningHome ||
      Math.abs(velocityX) > 0.01 ||
      Math.abs(velocityY) > 0.01 ||
      Math.abs(velocityZ) > 0.01
    );
  }

  function scheduleHeroTransform() {
    if (heroAnimationFrame !== null) return;

    heroAnimationFrame = requestAnimationFrame(applyHeroTransform);
  }

  function applyHeroTransform() {
    heroAnimationFrame = null;

    if (isReturningHome) {
      const progress = Math.min((performance.now() - returnStartTime) / returnDuration, 1);
      const easedProgress = easeInOutCubic(progress);

      tiltX = returnFromX * (1 - easedProgress);
      tiltY = returnFromY * (1 - easedProgress);
      spinZ = returnFromSpin + (returnToSpin - returnFromSpin) * easedProgress;

      if (progress === 1) {
        tiltX = 0;
        tiltY = 0;
        isReturningHome = false;
        heroCard.classList.remove("is-tilting");
      }
    } else {
      tiltX += velocityX;
      tiltY += velocityY;
      spinZ += velocityZ;

      velocityX *= 0.94;
      velocityY *= 0.94;
      velocityZ *= 0.95;

      if (!hasHeroMotion()) {
        velocityX = 0;
        velocityY = 0;
        velocityZ = 0;
      }
    }

    devSymbol.style.setProperty("--tilt-x", `${tiltX}deg`);
    devSymbol.style.setProperty("--tilt-y", `${tiltY}deg`);
    devSymbol.style.setProperty("--spin-z", `${spinZ}deg`);

    if (hasHeroMotion()) {
      scheduleHeroTransform();
    }
  }

  function updateLight(event) {
    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    devSymbol.style.setProperty("--mouse-x", `${x * 100}%`);
    devSymbol.style.setProperty("--mouse-y", `${y * 100}%`);
  }

  heroCard.addEventListener("pointerenter", (event) => {
    isPointerInside = true;
    clearTimeout(settleTimeout);
    settleTimeout = null;
    isReturningHome = false;
    heroCard.classList.add("is-tilting");
    lastX = event.clientX;
    lastY = event.clientY;
    updateLight(event);
    scheduleHeroTransform();
  });

  heroCard.addEventListener("pointermove", (event) => {
    if (isReturningHome) return;

    const movementX = event.clientX - lastX;
    const movementY = event.clientY - lastY;

    velocityY += movementX * 0.045;
    velocityX -= movementY * 0.045;
    velocityZ += movementX * 0.018;

    velocityX = Math.max(-2.2, Math.min(2.2, velocityX));
    velocityY = Math.max(-2.2, Math.min(2.2, velocityY));
    velocityZ = Math.max(-1.6, Math.min(1.6, velocityZ));

    lastX = event.clientX;
    lastY = event.clientY;
    updateLight(event);
    scheduleHeroTransform();
  });

  heroCard.addEventListener("pointerdown", (event) => {
    isReturningHome = false;

    const rect = heroCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    isPressing = true;
    heroCard.setPointerCapture(event.pointerId);
    velocityX += y * 8;
    velocityY -= x * 8;
    velocityZ += x * 5;
    updateLight(event);
    scheduleHeroTransform();
  });

  heroCard.addEventListener("pointerup", (event) => {
    isPressing = false;
    heroCard.releasePointerCapture(event.pointerId);
  });

  heroCard.addEventListener("pointerleave", () => {
    isPointerInside = false;
    settleTimeout = setTimeout(() => {
      devSymbol.style.setProperty("--mouse-x", "50%");
      devSymbol.style.setProperty("--mouse-y", "50%");
      startReturnHome();
    }, 180);
  });

  heroCard.addEventListener("dblclick", () => {
    isReturningHome = false;
    velocityZ += 8;
    scheduleHeroTransform();
  });
}

const homeSection = document.querySelector("#home");

if (homeSection) {
  const homePerformanceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      homeSection.classList.toggle("is-paused", !entry.isIntersecting);
    });
  }, {
    rootMargin: "120px 0px 120px 0px"
  });

  homePerformanceObserver.observe(homeSection);
}

/* ============================= */
/* ANIMACAO AO APARECER NA TELA */
/* ============================= */
const hiddenElements = document.querySelectorAll(
  ".home-text, .home-img, .about-img, .about-text, .project-card, .skills, .certificates, .contact"
);

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

hiddenElements.forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

/* ============================= */
/* CARROSSEL DE PROJETOS PREMIUM */
/* ============================= */
const projectsContainer = document.querySelector(".projects-container");
const projectCards = document.querySelectorAll(".project-card");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");
const projectsSection = document.querySelector("#projects");
const projectsViewport = document.querySelector(".projects-viewport");
const certificatesContainer = document.querySelector(".certificates-container");
const certificateCards = document.querySelectorAll(".certificate-card");
const certificatesLeftArrow = document.querySelector(".cert-left");
const certificatesRightArrow = document.querySelector(".cert-right");
const certificatesSection = document.querySelector("#certificates");
const certificatesViewport = document.querySelector(".certificates-viewport");

let currentIndex = 0;
let wheelScrollLocked = false;
let certificateIndex = 0;
let certificateWheelLocked = false;

function getVisibleCards() {
  if (window.innerWidth <= 700) return 1;
  if (window.innerWidth <= 1000) return 2;
  return 3;
}

function getMaxIndex() {
  return Math.max(0, projectCards.length - getVisibleCards());
}

function updateCarousel() {
  if (!projectsContainer || projectCards.length === 0) return;

  const gap = 24;
  const cardWidth = projectCards[0].offsetWidth + gap;

  projectsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function nextProject() {
  const maxIndex = getMaxIndex();

  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
}

function prevProject() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

function isProjectsSectionVisible() {
  if (!projectsSection) return false;

  const rect = projectsSection.getBoundingClientRect();

  return rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
}

function getVisibleCertificates() {
  if (window.innerWidth <= 700) return 1;
  if (window.innerWidth <= 1000) return 2;
  return 3;
}

function getMaxCertificateIndex() {
  return Math.max(0, certificateCards.length - getVisibleCertificates());
}

function updateCertificatesCarousel() {
  if (!certificatesContainer || certificateCards.length === 0) return;

  const gap = 24;
  const cardWidth = certificateCards[0].offsetWidth + gap;

  certificatesContainer.style.transform = `translateX(-${certificateIndex * cardWidth}px)`;
}

function nextCertificate() {
  const maxIndex = getMaxCertificateIndex();

  if (certificateIndex < maxIndex) {
    certificateIndex++;
    updateCertificatesCarousel();
  }
}

function prevCertificate() {
  if (certificateIndex > 0) {
    certificateIndex--;
    updateCertificatesCarousel();
  }
}

function isCertificatesSectionVisible() {
  if (!certificatesSection) return false;

  const rect = certificatesSection.getBoundingClientRect();

  return rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
}

if (projectsContainer && leftArrow && rightArrow) {
  rightArrow.addEventListener("click", nextProject);

  leftArrow.addEventListener("click", prevProject);

  if (projectsViewport) {
    projectsViewport.setAttribute("tabindex", "0");

    projectsViewport.addEventListener(
      "wheel",
      (event) => {
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
          nextProject();
        } else {
          prevProject();
        }

        setTimeout(() => {
          wheelScrollLocked = false;
        }, 450);
      },
      { passive: false }
    );
  }

  window.addEventListener("keydown", (event) => {
    if (!isProjectsSectionVisible()) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextProject();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevProject();
    }
  });

  window.addEventListener("resize", () => {
    const maxIndex = getMaxIndex();

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    updateCarousel();
  });
}

if (certificatesContainer && certificatesLeftArrow && certificatesRightArrow) {
  certificatesRightArrow.addEventListener("click", nextCertificate);

  certificatesLeftArrow.addEventListener("click", prevCertificate);

  if (certificatesViewport) {
    certificatesViewport.setAttribute("tabindex", "0");

    certificatesViewport.addEventListener(
      "wheel",
      (event) => {
        const scrollDistance = event.shiftKey ? event.deltaY : event.deltaX;
        const isHorizontalScroll =
          event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY);

        if (!isHorizontalScroll || certificateWheelLocked) return;

        const maxIndex = getMaxCertificateIndex();
        const canScrollRight = scrollDistance > 0 && certificateIndex < maxIndex;
        const canScrollLeft = scrollDistance < 0 && certificateIndex > 0;

        if (!canScrollRight && !canScrollLeft) return;

        event.preventDefault();
        certificateWheelLocked = true;

        if (canScrollRight) {
          nextCertificate();
        } else {
          prevCertificate();
        }

        setTimeout(() => {
          certificateWheelLocked = false;
        }, 450);
      },
      { passive: false }
    );
  }

  window.addEventListener("keydown", (event) => {
    if (!isCertificatesSectionVisible()) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextCertificate();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevCertificate();
    }
  });

  window.addEventListener("resize", () => {
    const maxIndex = getMaxCertificateIndex();

    if (certificateIndex > maxIndex) {
      certificateIndex = maxIndex;
    }

    updateCertificatesCarousel();
  });
}
