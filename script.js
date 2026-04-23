console.log("Min Receptsamling landing page loaded.");

let showcaseGallery = null;

document.addEventListener("DOMContentLoaded", () => {
  setupAboutCarousel();
  showcaseGallery = setupShowcaseGallery();
  setupLanguage();
});

function setupLanguage() {
  const translations = {
    sv: {
      htmlLang: "sv",
      brandName: "Min Receptsamling",
      pageTitle: "Min Receptsamling - Din personliga receptsamling",
      metaDescription:
        "Min Receptsamling är din personliga receptsamling - helt privat. Ingen inloggning, ingen spårning och ingen reklam. Alla recept sparas lokalt på din enhet.",
      navFeatures: "Fördelar",
      navAbout: "Om appen",
      heroKicker: "Ingen inloggning. Ingen spårning. Ingen reklam.",
      heroTitle: "Din personliga receptsamling – helt privat",
      heroText:
        "Sparas på din enhet och synkas med iCloud mellan dina enheter, så att recepten alltid finns nära till hands. Kom igång direkt — inget konto behövs.",
      visualLabel: "Privat och enkel i mobilen",
      previewLabel: "Karusell med appvyer från Min Receptsamling",
      heroImageAlt: "Min Receptsamling app",
      visualCaptionTitle: "Allt stannar hos dig",
      visualCaptionText:
        "Recepten sparas på din enhet så att du kan laga mat utan konto, reklam eller störningar.",
      featuresLabel: "Det som gör skillnad",
      featuresTitle: "Full kontroll över dina recept",
      featuresIntro:
        "Din data stannar hos dig. Recepten sparas på din enhet och kan synkas säkert med iCloud mellan dina enheter. Ingen inloggning, ingen reklam och ingen spårning — bara dina recept, alltid nära till hands.",
      feature1Title: "Privat som standard",
      feature1Point1: "Alla recept sparas lokalt på din enhet",
      feature1Point2: "Ingen data skickas till servrar",
      feature2Title: "Inga konton",
      feature2Point1: "Börja direkt – ingen registrering",
      feature2Point2: "Inget lösenord att hålla reda på",
      feature3Title: "Ingen reklam",
      feature3Point1: "Inga banners, inga popups",
      feature3Point2: "Fokus på matlagning, inte annonser",
      feature4Title: "Enkelt att dela recept",
      feature4Point1: "Dela recept med familj och vänner",
      feature4Point2: "Dela med sms eller mail",
      feature5Title: "Ingen datainsamling",
      feature5Point1: "Appen samlar inte in personlig data",
      feature5Point2: "Ingen information delas vidare till tredje part",
      feature6Title: "Ingen spårning",
      feature6Point1: "Inga spårningsverktyg följer hur du använder appen",
      feature6Point2: "Du använder recepten i lugn och ro",
      aboutLabel: "Se appen",
      aboutTitle: "Om appen",
      aboutText:
        "Bläddra igenom några vyer och få en känsla för hur Min Receptsamling håller recepten tydliga, inspirerande och nära till hands.",
      showcaseTrackLabel: "Skärmbilder från appen Min Receptsamling",
      showcasePrev: "Föregående skärmbild",
      showcaseNext: "Nästa skärmbild",
      showcaseClose: "Stäng bild",
      showcaseOpen: "Öppna skärmbild",
      slide1Title: "Skapa och samla",
      slide1Text:
        "Bygg upp din egen receptbok och håll ordning på allt du vill laga igen.",
      slide2Title: "Följ steg för steg",
      slide2Text:
        "Instruktioner, ingredienser och checklista ligger där du behöver dem.",
      slide3Title: "Hitta favoritkänslan",
      slide3Text:
        "Bilder och tydliga receptkort gör det lätt att välja vad du vill laga nästa gång.",
      slide4Title: "Få matinspiration",
      slide4Text:
        "Bläddra bland dina rätter och hitta snabbt något du vill laga igen.",
      downloadLabel: "Redo att börja?",
      downloadTitle: "Ladda ner Min Receptsamling",
      downloadText:
        "Ladda ner appen och kom igång direkt utan konto, reklam eller spårning.",
      downloadBtn: "Öppna App Store",
      downloadBtnAria: "Ladda ner Min Receptsamling på App Store",
      downloadQrAria: "Öppna Min Receptsamling i App Store",
      downloadQrAlt: "QR-kod till Min Receptsamling på App Store",
      downloadQrTitle: "Skanna QR-koden",
      downloadQrText:
        "Öppna kameran på mobilen för att komma direkt till appen.",
      footerText: "© 2026 Min Receptsamling. Alla rättigheter förbehållna.",
      dotLabel: "Visa bild"
    },
    en: {
      htmlLang: "en",
      brandName: "My Recipe Collection App",
      pageTitle: "My Recipe Collection App - Your personal recipe collection",
      metaDescription:
        "My Recipe Collection App is your personal recipe collection - completely private. No login, no tracking, no ads. All recipes are stored locally on your device.",
      navFeatures: "Benefits",
      navAbout: "About the app",
      heroKicker: "No login. No tracking. No ads.",
      heroTitle: "Your personal recipe collection – completely private",
      heroText:
        "Stored on your device and synced with iCloud across your devices, so your recipes are always within reach. Get started right away — no account needed.",
      visualLabel: "Private and simple on your phone",
      previewLabel: "Carousel with previews of My Recipe Collection App",
      heroImageAlt: "My Recipe Collection App",
      visualCaptionTitle: "Everything stays with you",
      visualCaptionText:
        "Your recipes stay on your device, so you can cook without accounts, ads, or distractions.",
      featuresLabel: "What stands out",
      featuresTitle: "Full control over your recipes",
      featuresIntro:
        "Your data stays with you. Recipes are stored on your device and can be securely synced with iCloud across your devices. No login, no ads, and no tracking — just your recipes, always within reach.",
      feature1Title: "Private by default",
      feature1Point1: "All recipes are stored locally on your device",
      feature1Point2: "No data is sent to servers",
      feature2Title: "No accounts",
      feature2Point1: "Get started right away – no sign-up required",
      feature2Point2: "No password to remember",
      feature3Title: "No ads",
      feature3Point1: "No banners, no pop-ups",
      feature3Point2: "Focus on cooking, not advertising",
      feature4Title: "Easy to share recipes",
      feature4Point1: "Share recipes with family and friends",
      feature4Point2: "Share by text message or email",
      feature5Title: "No data collection",
      feature5Point1: "The app does not collect personal data",
      feature5Point2: "No information is shared with third parties",
      feature6Title: "No tracking",
      feature6Point1: "No tracking tools follow how you use the app",
      feature6Point2: "Use your recipes in peace and quiet",
      aboutLabel: "See the app",
      aboutTitle: "About the app",
      aboutText:
        "Browse a few views and get a feel for how My Recipe Collection App keeps your recipes clear, inspiring, and close at hand.",
      showcaseTrackLabel: "Screenshots from My Recipe Collection App",
      showcasePrev: "Previous screenshot",
      showcaseNext: "Next screenshot",
      showcaseClose: "Close image",
      showcaseOpen: "Open screenshot",
      slide1Title: "Create and collect",
      slide1Text:
        "Build your own recipe book and keep track of everything you want to cook again.",
      slide2Title: "Follow step by step",
      slide2Text:
        "Instructions, ingredients, and your checklist stay right where you need them.",
      slide3Title: "Find your favorites",
      slide3Text:
        "Images and clear recipe cards make it easy to choose what you want to cook next.",
      slide4Title: "Get inspired",
      slide4Text:
        "Browse your dishes and quickly find something you want to cook again.",
      downloadLabel: "Ready to start?",
      downloadTitle: "Download My Recipe Collection App",
      downloadText:
        "Download the app and get started right away without an account, ads, or tracking.",
      downloadBtn: "Open App Store",
      downloadBtnAria: "Download My Recipe Collection App on the App Store",
      downloadQrAria: "Open My Recipe Collection App on the App Store",
      downloadQrAlt: "QR code for My Recipe Collection App on the App Store",
      downloadQrTitle: "Scan the QR code",
      downloadQrText:
        "Open your phone camera to go straight to the app.",
      footerText: "© 2026 My Recipe Collection App. All rights reserved.",
      dotLabel: "Show image"
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

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.getAttribute("data-i18n-aria-label");
      if (content[key]) {
        element.setAttribute("aria-label", content[key]);
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const key = element.getAttribute("data-i18n-alt");
      if (content[key]) {
        element.setAttribute("alt", content[key]);
      }
    });

    document.querySelectorAll("img[data-img-sv][data-img-en]").forEach((img) => {
      const newSrc = selected === "en" ? img.dataset.imgEn : img.dataset.imgSv;
      if (img.getAttribute("src") !== newSrc) {
        img.setAttribute("src", newSrc);
      }
    });

    document.querySelectorAll(".about-dot").forEach((dot, index) => {
      dot.setAttribute("aria-label", `${content.dotLabel} ${index + 1}`);
    });

    langButtons.forEach((button) => {
      const isActive = button.dataset.lang === selected;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    showcaseGallery?.updateLanguage(selected, content);
    localStorage.setItem("preferredLanguage", selected);
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });

  setLanguage(initialLanguage);
}

function setupShowcaseGallery() {
  const track = document.getElementById("showcaseTrack");
  const prevButton = document.querySelector("[data-showcase-prev]");
  const nextButton = document.querySelector("[data-showcase-next]");
  const lightbox = document.getElementById("showcaseLightbox");
  const lightboxImage = document.getElementById("showcaseLightboxImage");
  const closeTriggers = document.querySelectorAll("[data-showcase-close]");

  if (!track || !lightbox || !lightboxImage) return null;

  const showcaseItems = [
    { sv: "01_sv.jpg", en: "01_en.jpg" },
    { sv: "02_sv.jpg", en: "02_en.jpg" },
    { sv: "03_sv.jpg", en: "03_en.jpg" },
    { sv: "04_sv.jpg", en: "04_en.jpg" },
    { sv: "05_sv.jpg", en: "05_en.jpg" },
    { sv: "06-sv.jpg", en: "06_en.jpg" },
    { sv: "07_sv.jpg", en: "07_en.jpg" },
    { sv: "08_sv.jpg", en: "08_en.jpg" }
  ];

  let activeIndex = 0;
  let closeTimeout = 0;

  track.innerHTML = "";

  showcaseItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "showcase-card";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "showcase-card-button";
    button.dataset.index = String(index);
    button.dataset.resolvedSrc = item.sv;

    const image = document.createElement("img");
    image.className = "showcase-card-image";
    image.src = item.sv;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.draggable = false;

    button.appendChild(image);
    card.appendChild(button);
    track.appendChild(card);
  });

  const cardButtons = Array.from(track.querySelectorAll(".showcase-card-button"));

  function getTrackGap() {
    const styles = window.getComputedStyle(track);
    return parseInt(styles.columnGap || styles.gap || "0", 10);
  }

  function getCardStep() {
    const firstCard = track.querySelector(".showcase-card");
    if (!firstCard) return 0;
    return firstCard.getBoundingClientRect().width + getTrackGap();
  }

  function updateNavButtons() {
    if (!prevButton || !nextButton) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 4);
    prevButton.disabled = track.scrollLeft <= 4;
    nextButton.disabled = track.scrollLeft >= maxScroll;
  }

  function loadShowcaseImage(button, lang) {
    const index = Number(button.dataset.index);
    const item = showcaseItems[index];
    const image = button.querySelector(".showcase-card-image");
    if (!image || !item) return;

    const preferredSrc = lang === "en" ? item.en : item.sv;
    const fallbackSrc = item.sv;

    if (preferredSrc === fallbackSrc) {
      image.src = fallbackSrc;
      button.dataset.resolvedSrc = fallbackSrc;
      if (!lightbox.hidden && activeIndex === index) {
        lightboxImage.src = fallbackSrc;
      }
      return;
    }

    const requestId = String(Number(button.dataset.requestId || "0") + 1);
    button.dataset.requestId = requestId;

    const probe = new Image();
    probe.onload = () => {
      if (button.dataset.requestId !== requestId) return;
      image.src = preferredSrc;
      button.dataset.resolvedSrc = preferredSrc;
      if (!lightbox.hidden && activeIndex === index) {
        lightboxImage.src = preferredSrc;
      }
    };
    probe.onerror = () => {
      if (button.dataset.requestId !== requestId) return;
      image.src = fallbackSrc;
      button.dataset.resolvedSrc = fallbackSrc;
      if (!lightbox.hidden && activeIndex === index) {
        lightboxImage.src = fallbackSrc;
      }
    };
    probe.src = preferredSrc;
  }

  function openLightbox(index) {
    const nextIndex = Math.max(0, Math.min(index, cardButtons.length - 1));
    const button = cardButtons[nextIndex];
    if (!button) return;

    window.clearTimeout(closeTimeout);
    activeIndex = nextIndex;
    lightboxImage.src =
      button.dataset.resolvedSrc || button.querySelector(".showcase-card-image")?.src || "";

    lightbox.hidden = false;
    document.body.classList.add("showcase-modal-open");

    requestAnimationFrame(() => {
      lightbox.classList.add("is-visible");
      lightbox.querySelector(".showcase-lightbox-close")?.focus();
    });
  }

  function closeLightbox() {
    if (lightbox.hidden) return;

    lightbox.classList.remove("is-visible");
    document.body.classList.remove("showcase-modal-open");

    window.clearTimeout(closeTimeout);
    closeTimeout = window.setTimeout(() => {
      lightbox.hidden = true;
      lightboxImage.removeAttribute("src");
    }, 220);
  }

  function stepLightbox(direction) {
    if (lightbox.hidden) return;

    const nextIndex =
      (activeIndex + direction + cardButtons.length) % Math.max(cardButtons.length, 1);
    activeIndex = nextIndex;

    const button = cardButtons[activeIndex];
    if (!button) return;

    lightboxImage.src =
      button.dataset.resolvedSrc || button.querySelector(".showcase-card-image")?.src || "";
    button.closest(".showcase-card")?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }

  prevButton?.addEventListener("click", () => {
    const step = getCardStep();
    if (!step) return;
    track.scrollBy({ left: -step, behavior: "smooth" });
  });

  nextButton?.addEventListener("click", () => {
    const step = getCardStep();
    if (!step) return;
    track.scrollBy({ left: step, behavior: "smooth" });
  });

  cardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(Number(button.dataset.index));
    });
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", closeLightbox);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  track.addEventListener("scroll", updateNavButtons, { passive: true });
  window.addEventListener("resize", updateNavButtons);

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowRight") {
      stepLightbox(1);
    } else if (event.key === "ArrowLeft") {
      stepLightbox(-1);
    }
  });

  updateNavButtons();

  return {
    updateLanguage(lang, content) {
      cardButtons.forEach((button, index) => {
        button.setAttribute("aria-label", `${content.showcaseOpen} ${index + 1}`);
        loadShowcaseImage(button, lang);
      });

      prevButton?.setAttribute("aria-label", content.showcasePrev);
      nextButton?.setAttribute("aria-label", content.showcaseNext);
      lightbox
        .querySelector(".showcase-lightbox-close")
        ?.setAttribute("aria-label", content.showcaseClose);
    }
  };
}

function setupAboutCarousel() {
  const slider = document.getElementById("aboutSlider");
  const dotsContainer = document.getElementById("aboutDots");
  if (!slider || !dotsContainer) return;

  const slides = slider.querySelectorAll(".about-slide");
  if (!slides.length) return;

  dotsContainer.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `about-dot${index === 0 ? " active" : ""}`;
    dot.setAttribute("aria-label", `Visa bild ${index + 1}`);
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".about-dot");

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
    }, 4200);
  }

  function restartAutoScroll(delay = 4200) {
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
      currentIndex = clampIndex(currentIndex + 1);
    } else if (movedBy < -threshold) {
      currentIndex = clampIndex(currentIndex - 1);
    } else {
      currentIndex = getCurrentIndexFromScroll();
    }

    goToSlide(currentIndex, "smooth");
    restartAutoScroll(moved ? 5000 : 2600);
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
      restartAutoScroll(1600);
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
