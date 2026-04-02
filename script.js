console.log("Mina Recept landing page loaded.");
const aboutSlider = document.getElementById("aboutSlider");
const aboutDots = document.querySelectorAll(".about-dot");

if (aboutSlider && aboutDots.length) {
  const slides = document.querySelectorAll(".about-slide");
  let currentIndex = 0;
  let autoSlide;

  function updateDots(index) {
    aboutDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function goToSlide(index) {
    const slideWidth = slides[0].offsetWidth + 24; // slide width + gap
    aboutSlider.scrollTo({
      left: index * slideWidth,
      behavior: "smooth"
    });
    currentIndex = index;
    updateDots(currentIndex);
  }

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  aboutDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(index);
      startAutoSlide();
    });
  });

  aboutSlider.addEventListener("touchstart", stopAutoSlide);
  aboutSlider.addEventListener("touchend", startAutoSlide);

  startAutoSlide();
}
