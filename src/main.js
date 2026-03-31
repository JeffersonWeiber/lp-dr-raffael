import { initCarousel } from "./js/carousel/carousel";
import { testimonials } from "./js/carousel/carousel.data";
import { renderSlides } from "./js/carousel/carousel.renderer";
import { initAOS } from "./js/aos";
import "bootstrap-icons/font/bootstrap-icons.css";

document.addEventListener("DOMContentLoaded", () => {
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
});
