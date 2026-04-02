console.log("Mina Recept landing page loaded.");

const aboutSlider = document.getElementById("aboutSlider");
const aboutDots = document.querySelectorAll(".about-dot");
const aboutPrev = document.getElementById("aboutPrev");
const aboutNext = document.getElementById("aboutNext");

if (aboutSlider && aboutDots.length) {
  const slides = document.querySelectorAll(".about-slide");
  let currentIndex = 0;
  let autoSlide;
  let isInteracting = false;

  function updateDots(index) {
    aboutDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function getSlideWidth() {
    const firstSlide = slides[0];
    const sliderStyles = window.getComputedStyle(aboutSlider);
    const gap = parseInt(sliderStyles.columnGap || sliderStyles.gap || 0, 10);
    return firstSlide.offsetWidth + gap;
  }

  function goToSlide(index) {
    const slideWidth = getSlideWidth();

    aboutSlider.scrollTo({
      left: index * slideWidth,
      behavior: "smooth"
    });

    currentIndex = index;
    updateDots(currentIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();

    autoSlide = setInterval(() => {
      if (isInteracting) return;

      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }, 3500);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
    }
  }

  function updateCurrentSlideFromScroll() {
    const slideWidth = getSlideWidth();
    const index = Math.round(aboutSlider.scrollLeft / slideWidth);

    if (index >= 0 && index < slides.length) {
      currentIndex = index;
      updateDots(currentIndex);
    }
  }

  aboutDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      isInteracting = true;
      stopAutoSlide();
      goToSlide(index);

      setTimeout(() => {
        isInteracting = false;
        startAutoSlide();
      }, 4000);
    });
  });

  if (aboutPrev) {
    aboutPrev.addEventListener("click", () => {
      isInteracting = true;
      stopAutoSlide();

      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(currentIndex);

      setTimeout(() => {
        isInteracting = false;
        startAutoSlide();
      }, 4000);
    });
  }

  if (aboutNext) {
    aboutNext.addEventListener("click", () => {
      isInteracting = true;
      stopAutoSlide();

      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);

      setTimeout(() => {
        isInteracting = false;
        startAutoSlide();
      }, 4000);
    });
  }

  aboutSlider.addEventListener("touchstart", () => {
    isInteracting = true;
    stopAutoSlide();
  });

  aboutSlider.addEventListener("touchend", () => {
    updateCurrentSlideFromScroll();

    setTimeout(() => {
      isInteracting = false;
      startAutoSlide();
    }, 4000);
  });

  aboutSlider.addEventListener("scroll", () => {
    updateCurrentSlideFromScroll();
  });

  window.addEventListener("resize", () => {
    goToSlide(currentIndex);
  });

  updateDots(currentIndex);
  startAutoSlide();
}
