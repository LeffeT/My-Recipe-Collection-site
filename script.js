console.log("Mina Recept landing page loaded.");

document.addEventListener("DOMContentLoaded", () => {
  setupLanguage();
  setupAboutCarousel();
});

function setupLanguage() {
  const translations = {
    sv: {
      htmlLang: "sv",
      pageTitle: "Mina Recept – Din personliga kokbok i mobilen",
      metaDescription:
        "Mina Recept är din personliga kokbok i mobilen. Skapa, spara och organisera dina favoritrecept enkelt och stilrent.",
      navFeatures: "Funktioner",
      navAbout: "Om appen",
      navDownload: "Ladda ner",
      heroTitle: "Din personliga kokbok i mobilen",
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
      downloadText: "Snart tillgänglig på App Store.",
      downloadBtn: "Kommer snart till App Store",
      footerText: "© 2026 Min Receptsamling. Alla rättigheter förbehållna."
    },
    en: {
      htmlLang: "en",
      pageTitle: "My Recipes – Your personal cookbook on your phone",
      metaDescription:
        "My Recipes is your personal cookbook on your phone. Create, save, and organize your favorite recipes in a simple and elegant way.",
      navFeatures: "Features",
      navAbout: "About",
      navDownload: "Download",
      heroTitle: "Your personal cookbook on your phone",
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
      downloadText: "Coming soon to the App Store.",
      downloadBtn: "Coming soon to the App Store",
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
  const aboutSlider = document.getElementById("aboutSlider");
  const aboutDots = document.querySelectorAll(".about-dot");

  if (!aboutSlider || !aboutDots.length) return;

  const slides = aboutSlider.querySelectorAll(".about-slide");

  let currentIndex = 0;
  let autoSlide = null;
  let restartTimer = null;

  let isPointerDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  let pointerId = null;
  let hasMoved = false;

  function getGap() {
    const styles = window.getComputedStyle(aboutSlider);
    return parseInt(styles.gap || styles.columnGap || "0", 10);
  }

  function getSlideWidth() {
    if (!slides.length) return 0;
    return slides[0].offsetWidth + getGap();
  }

  function updateDots(index) {
    aboutDots.forEach((dot, i) => {
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

    aboutSlider.scrollTo({
      left: currentIndex * slideWidth,
      behavior
    });

    updateDots(currentIndex);
  }

  function getNearestIndex() {
    const slideWidth = getSlideWidth();
    if (!slideWidth) return 0;
    return Math.round(aboutSlider.scrollLeft / slideWidth);
  }

  function syncIndexFromScroll() {
    const index = clampIndex(getNearestIndex());
    if (index !== currentIndex) {
      currentIndex = index;
      updateDots(currentIndex);
    }
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }

    if (restartTimer) {
      clearTimeout(restartTimer);
      restartTimer = null;
    }
  }

  function startAutoSlide() {
    stopAutoSlide();

    autoSlide = setInterval(() => {
      const nextIndex = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1;
      goToSlide(nextIndex, "smooth");
    }, 3500);
  }

  function scheduleAutoRestart(delay = 4000) {
    if (restartTimer) {
      clearTimeout(restartTimer);
    }

    restartTimer = setTimeout(() => {
      startAutoSlide();
    }, delay);
  }

  aboutDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(index, "smooth");
      scheduleAutoRestart();
    });
  });

  aboutSlider.addEventListener("scroll", syncIndexFromScroll, { passive: true });

  aboutSlider.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    isPointerDown = true;
    hasMoved = false;
    startX = event.clientX;
    startScrollLeft = aboutSlider.scrollLeft;
    pointerId = event.pointerId;

    aboutSlider.classList.add("dragging");
    aboutSlider.setPointerCapture(pointerId);
    stopAutoSlide();
  });

  aboutSlider.addEventListener("pointermove", (event) => {
    if (!isPointerDown) return;
    if (pointerId !== event.pointerId) return;

    const deltaX = event.clientX - startX;

    if (Math.abs(deltaX) > 4) {
      hasMoved = true;
    }

    aboutSlider.scrollLeft = startScrollLeft - deltaX;

    if (event.pointerType === "mouse") {
      event.preventDefault();
    }
  });

  function finishPointerDrag(event) {
    if (!isPointerDown) return;
    if (pointerId !== event.pointerId) return;

    isPointerDown = false;
    aboutSlider.classList.remove("dragging");

    try {
      aboutSlider.releasePointerCapture(pointerId);
    } catch (error) {
      // Ignorera om capture redan släppts
    }

    pointerId = null;

    const nearestIndex = clampIndex(getNearestIndex());
    goToSlide(nearestIndex, "smooth");
    scheduleAutoRestart(hasMoved ? 4500 : 3000);
  }

  aboutSlider.addEventListener("pointerup", finishPointerDrag);
  aboutSlider.addEventListener("pointercancel", finishPointerDrag);

  aboutSlider.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  aboutSlider.addEventListener("mouseenter", () => {
    stopAutoSlide();
  });

  aboutSlider.addEventListener("mouseleave", () => {
    if (!isPointerDown) {
      scheduleAutoRestart(1500);
    }
  });

  aboutSlider.addEventListener(
    "touchstart",
    () => {
      stopAutoSlide();
    },
    { passive: true }
  );

  aboutSlider.addEventListener(
    "touchend",
    () => {
      syncIndexFromScroll();
      scheduleAutoRestart();
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    goToSlide(currentIndex, "auto");
  });

  updateDots(currentIndex);
  goToSlide(0, "auto");
  startAutoSlide();
}
