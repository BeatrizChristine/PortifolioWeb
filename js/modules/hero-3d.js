function initHero3d() {
  const heroCard = document.querySelector(".hero-card");
  const devSymbol = document.querySelector(".dev-symbol-3d");
  const homeSection = document.querySelector("#home");

  if (heroCard && devSymbol) {
    createHeroTilt(heroCard, devSymbol);
  }

  if (homeSection) {
    pauseHomeAnimationWhenHidden(homeSection);
  }
}

function createHeroTilt(heroCard, devSymbol) {
  let tiltX = 0;
  let tiltY = 0;
  let spinZ = 0;
  let velocityX = 0;
  let velocityY = 0;
  let velocityZ = 0;
  let lastX = 0;
  let lastY = 0;
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
      const progress = Math.min(
        (performance.now() - returnStartTime) / returnDuration,
        1
      );
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

function pauseHomeAnimationWhenHidden(homeSection) {
  const homePerformanceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      homeSection.classList.toggle("is-paused", !entry.isIntersecting);
    });
  }, {
    rootMargin: "120px 0px 120px 0px"
  });

  homePerformanceObserver.observe(homeSection);
}
