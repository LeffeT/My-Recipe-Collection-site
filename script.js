console.log("Mina Recept landing page loaded.");

const aboutSlider = document.getElementById("aboutSlider");
const aboutDots = document.querySelectorAll(".about-dot");

if (aboutSlider && aboutDots.length) {
  const slides = Array.from(document.querySelectorAll(".about-slide"));
  let currentIndex = 0;
  let autoSlide = null;

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationId = 0;

  function updateDots(index) {
    aboutDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function getSlideWidth() {
    const styles = window.getComputedStyle(aboutSlider);
    const gap = parseInt(styles.gap || styles.columnGap || 0, 10);
    return slides[0].offsetWidth + gap;
  }

  function setSliderPosition() {
    aboutSlider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function goToSlide(index, animate = true) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    const slideWidth = getSlideWidth();

    aboutSlider.style.transition = animate ? "transform 0.35s ease" : "none";
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
    updateDots(currentIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex, true);
    }, 3500);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  function animation() {
    setSliderPosition();
    if (isDragging) {
      animationId = requestAnimationFrame(animation);
    }
  }

  function pointerDown(x) {
    isDragging = true;
    stopAutoSlide();
    aboutSlider.classList.add("dragging");
    aboutSlider.style.transition = "none";
    startX = x;
    animationId = requestAnimationFrame(animation);
  }

  function pointerMove(x) {
    if (!isDragging) return;
    const delta = x - startX;
    currentTranslate = prevTranslate + delta;
  }

  function pointerUp() {
    if (!isDragging) return;

    isDragging = false;
    cancelAnimationFrame(animationId);
    aboutSlider.classList.remove("dragging");

    const slideWidth = getSlideWidth();
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < slides.length - 1) {
      currentIndex += 1;
    } else if (movedBy > 50 && currentIndex > 0) {
      currentIndex -= 1;
    }

    goToSlide(currentIndex, true);

    setTimeout(() => {
      startAutoSlide();
    }, 4000);
  }

  aboutSlider.addEventListener("pointerdown", (e) => {
    pointerDown(e.clientX);
    aboutSlider.setPointerCapture(e.pointerId);
  });

  aboutSlider.addEventListener("pointermove", (e) => {
    pointerMove(e.clientX);
  });

  aboutSlider.addEventListener("pointerup", () => {
    pointerUp();
  });

  aboutSlider.addEventListener("pointercancel", () => {
    pointerUp();
  });

  aboutSlider.addEventListener("lostpointercapture", () => {
    pointerUp();
  });

  aboutDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(index, true);
      setTimeout(() => {
        startAutoSlide();
      }, 4000);
    });
  });

  window.addEventListener("resize", () => {
    goToSlide(currentIndex, false);
  });

  slides.forEach((slide) => {
    slide.style.flex = "0 0 100%";
  });

  goToSlide(0, false);
  startAutoSlide();
}
