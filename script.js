console.log("Mina Recept landing page loaded.");

document.addEventListener("DOMContentLoaded", () => {
  setupLanguage();
  setupAboutCarousel();
});

function setupLanguage() {
  const translations = {
    sv: {
      htmlLang: "sv",
      pageTitle: "Mina Recept – Din personliga receptsamling",
      metaDescription:
        "Mina Recept är din personliga receptsamling. Skapa, spara och organisera dina favoritrecept enkelt och stilrent.",
      navFeatures: "Funktioner",
      navAbout: "Om appen",
      navDownload: "Ladda ner",
      heroTitle: "Din personliga receptsamling",
      heroText:
        "Skapa, spara och organisera dina favoritrecept på ett enkelt och stilrent sätt. Ha allt samlat på ett ställe, alltid nära till hands. Dela enkelt recept med familj och vänner.",
      heroPrimaryBtn: "Ladda ner appen",
      heroSecondaryBtn: "Läs mer",
      featuresTitle: "Funktioner",
      feature1Title: "Skapa recept",
      feature1Text:
        "Skriv in ingredienser, instruktioner och portioner på ett tydligt sätt.",
      feature2Title: "Spara favoriter",
      feature2Text:
        "Samla dina bästa recept i en egen digital receptsamling.",
      feature3Title: "Enkelt att använda",
      feature3Text:
        "Ren design som gör att recepten är lätta att läsa medan du lagar mat.",
      aboutTitle: "Om appen",
      aboutText:
        "Mina Recept hjälper dig att samla, organisera och använda dina favoritrecept på ett enkelt och tydligt sätt. Här är några exempel på hur appen fungerar.",
      slide1Title: "Skapa och samla recept",
      slide1Text:
        "Samla dina recept på ett ställe och få bättre ordning i vardagen.",
      slide2Title: "Följ recepten enkelt",
      slide2Text:
        "Se ingredienser, instruktioner och bilder i en tydlig och lugn layout.",
      slide3Title: "Anpassa appen",
      slide3Text:
        "Justera appen efter dina behov och ha dina recept nära till hands.",
      downloadTitle: "Ladda ner appen",
      downloadText: "Hämta appen på App Store.",
      downloadBtn: "Ladda ner på App Store",
      footerText: "© 2026 Min Receptsamling. Alla rättigheter förbehållna."
    },
    en: {
      htmlLang: "en",
      pageTitle: "My Recipes – Your personal recipe collection",
      metaDescription:
        "My Recipes is Your personal recipe collection. Create, save, and organize your favorite recipes in a simple and elegant way.",
      navFeatures: "Features",
      navAbout: "About the app",
      navDownload: "Download",
      heroTitle: "Your personal recipe collection",
      heroText:
        "Create, save, and organize your favorite recipes in a simple and elegant way. Keep everything in one place, always close at hand. Easily share recipes with family and friends.",
      heroPrimaryBtn: "Download the app",
      heroSecondaryBtn: "Learn more",
      featuresTitle: "Features",
      feature1Title: "Create recipes",
      feature1Text:
        "Add ingredients, instructions, and servings in a clear and simple way.",
      feature2Title: "Save favorites",
      feature2Text:
        "Collect your best recipes in your own digital recipe collection.",
      feature3Title: "Easy to use",
      feature3Text:
        "A clean design that makes recipes easy to read while you cook.",
      aboutTitle: "About the app",
      aboutText:
        "My Recipes helps you collect, organize, and use your favorite recipes in a simple and clear way. Here are a few examples of how the app works.",
      slide1Title: "Create and collect recipes",
      slide1Text:
        "Keep your recipes in one place and bring more order to everyday cooking.",
      slide2Title: "Follow recipes easily",
      slide2Text:
        "See ingredients, instructions, and images in a clear and calm layout.",
      slide3Title: "Customize the app",
      slide3Text:
        "Adjust the app to your needs and keep your recipes close at hand.",
      downloadTitle: "Download the app",
      downloadText: "Get the app on the App Store.",
      downloadBtn: "Download on the App Store",
      footerText: "© 2026 My Recipe Collection. All rights reserved."
    }
  };

  const langButtons = document.querySelectorAll(".lang-btn");
  const savedLanguage = localStorage.getItem("preferredLanguage");
  const browserLanguage = (navigator.language || "sv").toLowerCase();
  const initialLanguage =
    savedLanguage || (browserLanguage.startsWith("sv") ? "sv" : "en");

  function setLanguage(lang) {
    const selected = translations[lang] ? lang : "sv";
    const content = translations[selected];

    document.documentElement.lang = content.htmlLang;
    document.title = content.pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", content.metaDescription);
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (content[key]) {
        element.textContent = content[key];
      }
    });

    document.querySelectorAll("img[data-img-sv][data-img-en]").forEach((img) => {
      const newSrc = selected === "en" ? img.dataset.imgEn : img.dataset.imgSv;
      if (img.getAttribute("src") !== newSrc) {
        img.setAttribute("src", newSrc);
      }
    });

    langButtons.forEach((button) => {
      const isActive = button.dataset.lang === selected;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    localStorage.setItem("preferredLanguage", selected);
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });

  setLanguage(initialLanguage);
}

function setupAboutCarousel() {
  const slider = document.getElementById("aboutSlider");
  const dots = document.querySelectorAll(".about-dot");

  if (!slider || !dots.length) return;

  const slides = slider.querySelectorAll(".about-slide");

  let currentIndex = 0;
  let autoScrollInterval = null;
  let restartTimeout = null;

  let isDragging = false;
  let moved = false;
  let startX = 0;
  let currentTranslate = 0;
  let previousTranslate = 0;
  let animationId = 0;

  function setSliderPosition(value) {
    slider.scrollLeft = value;
  }

  function getGap() {
    const styles = window.getComputedStyle(slider);
    return parseInt(styles.gap || styles.columnGap || "0", 10);
  }

  function getSlideWidth() {
    if (!slides.length) return 0;
    return slides[0].offsetWidth + getGap();
  }

  function updateDots(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function clampIndex(index) {
    return Math.max(0, Math.min(index, slides.length - 1));
  }

  function goToSlide(index, behavior = "smooth") {
    const slideWidth = getSlideWidth();
    if (!slideWidth) return;

    currentIndex = clampIndex(index);
    previousTranslate = currentIndex * slideWidth;

    slider.scrollTo({
      left: previousTranslate,
      behavior
    });

    updateDots(currentIndex);
  }

  function getCurrentIndexFromScroll() {
    const slideWidth = getSlideWidth();
    if (!slideWidth) return 0;
    return clampIndex(Math.round(slider.scrollLeft / slideWidth));
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }

    if (restartTimeout) {
      clearTimeout(restartTimeout);
      restartTimeout = null;
    }
  }

  function startAutoScroll() {
    stopAutoScroll();

    autoScrollInterval = setInterval(() => {
      const nextIndex = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1;
      goToSlide(nextIndex, "smooth");
    }, 3500);
  }

  function restartAutoScroll(delay = 3500) {
    if (restartTimeout) {
      clearTimeout(restartTimeout);
    }

    restartTimeout = setTimeout(() => {
      startAutoScroll();
    }, delay);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoScroll();
      goToSlide(index, "smooth");
      restartAutoScroll();
    });
  });

  function animation() {
    if (!isDragging) return;
    setSliderPosition(currentTranslate);
    animationId = requestAnimationFrame(animation);
  }

  function pointerDown(clientX) {
    isDragging = true;
    moved = false;
    startX = clientX;
    previousTranslate = slider.scrollLeft;
    currentTranslate = previousTranslate;

    slider.classList.add("dragging");
    stopAutoScroll();

    animationId = requestAnimationFrame(animation);
  }

  function pointerMove(clientX) {
    if (!isDragging) return;

    const diff = clientX - startX;

    if (Math.abs(diff) > 5) {
      moved = true;
    }

    currentTranslate = previousTranslate - diff;
  }

  function pointerUp() {
    if (!isDragging) return;

    isDragging = false;
    slider.classList.remove("dragging");
    cancelAnimationFrame(animationId);

    const movedBy = currentTranslate - previousTranslate;
    const threshold = getSlideWidth() * 0.15;

    if (movedBy > threshold) {
      currentIndex = clampIndex(currentIndex - 1);
    } else if (movedBy < -threshold) {
      currentIndex = clampIndex(currentIndex + 1);
    } else {
      currentIndex = getCurrentIndexFromScroll();
    }

    goToSlide(currentIndex, "smooth");
    restartAutoScroll(moved ? 4500 : 2500);
  }

  slider.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    pointerDown(event.pageX);
  });

  window.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    event.preventDefault();
    pointerMove(event.pageX);
  });

  window.addEventListener("mouseup", () => {
    pointerUp();
  });

  slider.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      pointerDown(touch.clientX);
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchmove",
    (event) => {
      if (!isDragging) return;
      const touch = event.touches[0];
      pointerMove(touch.clientX);
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    () => {
      pointerUp();
    },
    { passive: true }
  );

  slider.addEventListener("mouseleave", () => {
    if (isDragging) {
      pointerUp();
    } else {
      restartAutoScroll(1500);
    }
  });

  slider.addEventListener("mouseenter", () => {
    stopAutoScroll();
  });

  slider.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  slider.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
  });

  slider.addEventListener(
    "scroll",
    () => {
      if (!isDragging) {
        currentIndex = getCurrentIndexFromScroll();
        updateDots(currentIndex);
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    goToSlide(currentIndex, "auto");
  });

  updateDots(0);
  goToSlide(0, "auto");
  startAutoScroll();
}
