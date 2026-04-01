import { initCarousel } from "./js/carousel/carousel";
import { testimonials } from "./js/carousel/carousel.data";
import { renderSlides } from "./js/carousel/carousel.renderer";
import { initAOS } from "./js/aos";
import "bootstrap-icons/font/bootstrap-icons.css";

document.addEventListener("DOMContentLoaded", () => {
  const normalizeText = (value = "") =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const detectWhatsappIntent = (link) => {
    const explicitIntent = link.dataset.whatsappIntent;
    if (explicitIntent) return explicitIntent;

    const hrefText = normalizeText(decodeURIComponent(link.href || ""));
    const linkText = normalizeText(link.textContent || "");
    const ariaText = normalizeText(link.getAttribute("aria-label") || "");
    const combinedText = `${hrefText} ${linkText} ${ariaText}`;

    if (combinedText.includes("adulto")) return "adulto";
    if (combinedText.includes("infantil") || combinedText.includes("crianca")) {
      return "infantil";
    }

    return "geral";
  };

  const detectWhatsappPlacement = (link) => {
    const explicitPlacement = link.dataset.whatsappPlacement;
    if (explicitPlacement) return explicitPlacement;

    if (link.closest(".mobile-nav")) return "menu_mobile";
    if (link.closest(".site-header")) return "cabecalho";
    if (link.closest(".site-footer")) return "rodape";

    const section = link.closest("section[id]");
    if (section?.id) return section.id;

    return "pagina";
  };

  const bindWhatsappTracking = () => {
    const whatsappLinks = document.querySelectorAll(
      'a[href*="wa.link"], a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com/send"]'
    );

    whatsappLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const intent = detectWhatsappIntent(link);
        const placement = detectWhatsappPlacement(link);

        // Payload unificado e simplificado solicitado pelo usuário
        const gtmEvent = {
          event: "whatsapp_click",
          whatsapp_intent: intent,
          whatsapp_placement: placement,
          whatsapp_url: link.href,
          link_text: (link.textContent || "").trim()
        };

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(gtmEvent);

        // Log para validação direta no console F12
        console.log("🟢 [GTM Tracking] WhatsApp Click:", gtmEvent);
      });
    });
  };

  document.querySelectorAll("article").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel]");
    if (!track) return;

    renderSlides(track, testimonials);
    initCarousel(carousel, testimonials);
  });
  initAOS();

  // Mobile Menu Logic
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileNav = document.getElementById("mobile-nav");
  if (mobileMenuToggle && mobileNav) {
    const mobileOverlay = mobileNav.querySelector(".mobile-overlay");
    const mobileLinks = mobileNav.querySelectorAll(".mobile-nav-links a");

    const toggleMenu = () => {
      mobileNav.classList.toggle("is-open");
      document.body.classList.toggle("overflow-hidden");
    };

    mobileMenuToggle.addEventListener("click", toggleMenu);
    mobileMenuClose?.addEventListener("click", toggleMenu);
    mobileOverlay?.addEventListener("click", toggleMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        document.body.classList.remove("overflow-hidden");
      });
    });
  }

  // Cookie Consent Logic
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("accept-cookies");

  if (cookieBanner && acceptButton) {
    if (!localStorage.getItem("cookiesAccepted")) {
      setTimeout(() => {
        cookieBanner.classList.add("show");
      }, 1000);
    }

    acceptButton.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.classList.remove("show");
    });
  }

  bindWhatsappTracking();
});
